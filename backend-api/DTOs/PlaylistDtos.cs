using System.ComponentModel.DataAnnotations;

namespace backend_api.DTOs;

public record PlaylistResponse(
    Guid Id,
    string Name,
    string Description,
    bool ShowOnPlayer,
    IReadOnlyList<string> MediaIds);

public record CreatePlaylistRequest(
    [Required, MaxLength(200)] string Name,
    [MaxLength(2000)] string? Description,
    bool ShowOnPlayer);

public record UpdatePlaylistRequest(
    [Required, MaxLength(200)] string Name,
    [MaxLength(2000)] string? Description,
    bool ShowOnPlayer);

public record AddMediaToPlaylistRequest([Required] Guid MediaId);
