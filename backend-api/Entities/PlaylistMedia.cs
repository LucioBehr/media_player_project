namespace backend_api.Entities;

public class PlaylistMedia
{
    public Guid PlaylistId { get; set; }

    public Playlist Playlist { get; set; } = null!;

    public Guid MediaId { get; set; }

    public Media Media { get; set; } = null!;

    public int Order { get; set; }
}
