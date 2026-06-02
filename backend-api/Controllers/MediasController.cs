using backend_api.Data;
using backend_api.DTOs;
using backend_api.Entities;
using backend_api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Controllers;

[ApiController]
[Route("api/medias")]
public class MediasController(AppDbContext db, IWebHostEnvironment environment) : ControllerBase
{
    private string StoragePath => MediaFileHelper.GetStoragePath(environment);

    [HttpGet]
    public async Task<ActionResult<List<MediaResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var medias = await db.Medias
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync(cancellationToken);

        return medias.Select(m => ToResponse(m)).ToList();
    }

    // [HttpPost]
    // [Consumes("application/json")]
    // public async Task<ActionResult<MediaResponse>> CreateFromJson(
    //     [FromBody] CreateMediaRequest request,
    //     CancellationToken cancellationToken)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         return ValidationProblem(ModelState);
    //     }

    //     var storedValue = request.Url?.Trim() ?? string.Empty;

    //     if (string.IsNullOrEmpty(storedValue))
    //     {
    //         return BadRequest(new { message = "Informe uma URL ou envie um arquivo." });
    //     }

    //     var media = await SaveMediaAsync(
    //         request.Name,
    //         request.Description,
    //         request.Type,
    //         storedValue,
    //         cancellationToken);

    //     return CreatedAtAction(nameof(GetAll), new { id = media.Id }, ToResponse(media));
    // }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<MediaResponse>> CreateFromForm(
        [FromForm] MediaFormRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        try
        {
            var extension = Path.GetExtension(request.File.FileName).ToLowerInvariant();
            var videoExtensions = new HashSet<string> { ".mp4", ".webm", ".mov" };
            var mediaType = videoExtensions.Contains(extension) ? MediaType.Video : MediaType.Image;
            var storedValue = await ResolveStoredValueAsync(request.File, null, null);
            
            var media = await SaveMediaAsync(
                request.Name,
                request.Description,
                mediaType,
                storedValue,
                cancellationToken);

            return CreatedAtAction(nameof(GetAll), new { id = media.Id }, ToResponse(media));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

[HttpPut("{id:guid}")]
    [Consumes("application/json")]
    public async Task<ActionResult<MediaResponse>> UpdateFromJson(
        Guid id,
        [FromBody] UpdateMediaRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var media = await db.Medias.FindAsync([id], cancellationToken);

        if (media is null)
        {
            return NotFound(new { message = "Mídia não encontrada." });
        }

        media.Name = request.Name.Trim();
        media.Description = request.Description?.Trim() ?? string.Empty;
        media.Type = request.Type;

        /*
        if (!string.IsNullOrWhiteSpace(request.Url))
        {
            DeletePreviousFileIfReplaced(media, request.Url.Trim());
            media.FileName = request.Url.Trim();
        }
        */

        await db.SaveChangesAsync(cancellationToken);

        return ToResponse(media);
    }

    [HttpPut("{id:guid}")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<MediaResponse>> UpdateFromForm(
        Guid id,
        [FromForm] MediaFormRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var media = await db.Medias.FindAsync([id], cancellationToken);

        if (media is null)
        {
            return NotFound(new { message = "Mídia não encontrada." });
        }

        try
        {
            var storedValue = await ResolveStoredValueAsync(request.File, null, media.FileName);

            if (storedValue != media.FileName)
            {
                DeletePreviousFileIfReplaced(media, storedValue);
                media.FileName = storedValue;
            }

            var extension = Path.GetExtension(request.File.FileName).ToLowerInvariant();
            var videoExtensions = new HashSet<string> { ".mp4", ".webm", ".mov" };
            
            media.Name = request.Name.Trim();
            media.Description = request.Description?.Trim() ?? string.Empty;
            media.Type = videoExtensions.Contains(extension) ? MediaType.Video : MediaType.Image;

            await db.SaveChangesAsync(cancellationToken);

            return ToResponse(media);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var media = await db.Medias.FindAsync([id], cancellationToken);

        if (media is null)
        {
            return NotFound(new { message = "Mídia não encontrada." });
        }

        var playlistLinks = await db.PlaylistMedias
            .Where(pm => pm.MediaId == id)
            .ToListAsync(cancellationToken);

        db.PlaylistMedias.RemoveRange(playlistLinks);
        db.Medias.Remove(media);
        await db.SaveChangesAsync(cancellationToken);

        MediaFileHelper.DeleteStoredFile(StoragePath, media.FileName);

        return NoContent();
    }

    private async Task<Media> SaveMediaAsync(
        string name,
        string? description,
        MediaType type,
        string storedValue,
        CancellationToken cancellationToken)
    {
        var media = new Media
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Description = description?.Trim() ?? string.Empty,
            Type = type,
            FileName = storedValue,
            CreatedAt = DateTime.UtcNow,
        };

        db.Medias.Add(media);
        await db.SaveChangesAsync(cancellationToken);

        return media;
    }

    private async Task<string> ResolveStoredValueAsync(IFormFile? file, string? url, string? existingFileName)
    {
        if (file is not null)
        {
            return await MediaFileHelper.SaveUploadedFileAsync(file, StoragePath);
        }

        if (MediaFileHelper.IsExternalUrl(url))
        {
            return url!.Trim();
        }

        if (!string.IsNullOrWhiteSpace(url))
        {
            return url.Trim();
        }

        if (!string.IsNullOrWhiteSpace(existingFileName))
        {
            return existingFileName;
        }

        throw new InvalidOperationException("Informe uma URL ou envie um arquivo.");
    }

    private void DeletePreviousFileIfReplaced(Media media, string newStoredValue)
    {
        if (string.Equals(media.FileName, newStoredValue, StringComparison.Ordinal))
        {
            return;
        }

        MediaFileHelper.DeleteStoredFile(StoragePath, media.FileName);
    }

    private MediaResponse ToResponse(Media media)
    {
        var physicalPath = Path.Combine(StoragePath, media.FileName);
        var exists = System.IO.File.Exists(physicalPath);

        return new(
            media.Id,
            media.Name,
            media.Description,
            media.Type,
            exists ? MediaFileHelper.BuildPublicUrl(Request, media.FileName) : "FILE_NOT_FOUND",
            media.CreatedAt.ToString("yyyy-MM-dd")
        );
    }
}