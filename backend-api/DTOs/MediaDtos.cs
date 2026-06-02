using System.ComponentModel.DataAnnotations;
using backend_api.Entities;

namespace backend_api.DTOs;

public record MediaResponse(
    Guid Id,
    string Name,
    string Description,
    MediaType Type,
    string Url,
    string CreatedAt);

public record CreateMediaRequest(
    [Required, MaxLength(200)] string Name,
    [MaxLength(2000)] string? Description,
    [Required] MediaType Type,
    string? Url);

public record UpdateMediaRequest(
    [Required, MaxLength(200)] string Name,
    [MaxLength(2000)] string? Description,
    [Required] MediaType Type
);

public class MediaFormRequest
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Required]
    public IFormFile File { get; set; } = null!;
}
