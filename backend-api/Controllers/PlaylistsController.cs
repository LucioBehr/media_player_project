using backend_api.Data;
using backend_api.DTOs;
using backend_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Controllers;

[ApiController]
[Route("api/playlists")]
public class PlaylistsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<PlaylistResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var playlists = await QueryPlaylists()
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);

        return playlists.Select(ToResponse).ToList();
    }

    [HttpGet("active")]
    public async Task<ActionResult<PlaylistResponse?>> GetActive(CancellationToken cancellationToken)
    {
        var playlist = await QueryPlaylists()
            .FirstOrDefaultAsync(p => p.ShowOnPlayer, cancellationToken);

        return Ok(playlist is null ? null : ToResponse(playlist));
    }

    [HttpPost]
    public async Task<ActionResult<PlaylistResponse>> Create(
        [FromBody] CreatePlaylistRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        if (request.ShowOnPlayer)
        {
            await ClearShowOnPlayerFlags(cancellationToken);
        }

        var playlist = new Playlist
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Description = request.Description?.Trim() ?? string.Empty,
            ShowOnPlayer = request.ShowOnPlayer,
            CreatedAt = DateTime.UtcNow,
        };

        db.Playlists.Add(playlist);
        await db.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetAll), new { id = playlist.Id }, ToResponse(playlist));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<PlaylistResponse>> Update(
        Guid id,
        [FromBody] UpdatePlaylistRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var playlist = await QueryPlaylists()
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (playlist is null)
        {
            return NotFound(new { message = "Playlist não encontrada." });
        }

        if (request.ShowOnPlayer && !playlist.ShowOnPlayer)
        {
            await ClearShowOnPlayerFlags(cancellationToken);
        }

        playlist.Name = request.Name.Trim();
        playlist.Description = request.Description?.Trim() ?? string.Empty;
        playlist.ShowOnPlayer = request.ShowOnPlayer;

        await db.SaveChangesAsync(cancellationToken);

        return ToResponse(playlist);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var playlist = await db.Playlists.FindAsync([id], cancellationToken);

        if (playlist is null)
        {
            return NotFound(new { message = "Playlist não encontrada." });
        }

        db.Playlists.Remove(playlist);
        await db.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/medias")]
    public async Task<ActionResult<PlaylistResponse>> AddMedia(
        Guid id,
        [FromBody] AddMediaToPlaylistRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var playlist = await QueryPlaylists()
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (playlist is null)
        {
            return NotFound(new { message = "Playlist não encontrada." });
        }

        var mediaExists = await db.Medias.AnyAsync(m => m.Id == request.MediaId, cancellationToken);

        if (!mediaExists)
        {
            return NotFound(new { message = "Mídia não encontrada." });
        }

        if (playlist.PlaylistMedias.Any(pm => pm.MediaId == request.MediaId))
        {
            return ToResponse(playlist);
        }

        var nextOrder = playlist.PlaylistMedias.Count == 0
            ? 0
            : playlist.PlaylistMedias.Max(pm => pm.Order) + 1;

        playlist.PlaylistMedias.Add(new PlaylistMedia
        {
            PlaylistId = playlist.Id,
            MediaId = request.MediaId,
            Order = nextOrder,
        });

        await db.SaveChangesAsync(cancellationToken);

        await db.Entry(playlist).Collection(p => p.PlaylistMedias).LoadAsync(cancellationToken);

        return ToResponse(playlist);
    }

    [HttpDelete("{playlistId:guid}/medias/{mediaId:guid}")]
    public async Task<ActionResult<PlaylistResponse>> RemoveMedia(
        Guid playlistId,
        Guid mediaId,
        CancellationToken cancellationToken)
    {
        var playlist = await QueryPlaylists()
            .FirstOrDefaultAsync(p => p.Id == playlistId, cancellationToken);

        if (playlist is null)
        {
            return NotFound(new { message = "Playlist não encontrada." });
        }

        var link = playlist.PlaylistMedias.FirstOrDefault(pm => pm.MediaId == mediaId);

        if (link is not null)
        {
            db.PlaylistMedias.Remove(link);
            await db.SaveChangesAsync(cancellationToken);
            playlist.PlaylistMedias.Remove(link);
        }

        return ToResponse(playlist);
    }

    private IQueryable<Playlist> QueryPlaylists() =>
        db.Playlists.Include(p => p.PlaylistMedias);

    private async Task ClearShowOnPlayerFlags(CancellationToken cancellationToken)
    {
        var activePlaylists = await db.Playlists
            .Where(p => p.ShowOnPlayer)
            .ToListAsync(cancellationToken);

        foreach (var item in activePlaylists)
        {
            item.ShowOnPlayer = false;
        }
    }

    private static PlaylistResponse ToResponse(Playlist playlist) =>
        new(
            playlist.Id,
            playlist.Name,
            playlist.Description,
            playlist.ShowOnPlayer,
            playlist.PlaylistMedias
                .OrderBy(pm => pm.Order)
                .Select(pm => pm.MediaId.ToString())
                .ToList());
}
