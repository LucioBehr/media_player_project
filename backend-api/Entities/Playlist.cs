namespace backend_api.Entities;

public class Playlist
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public bool ShowOnPlayer { get; set; }

    public DateTime CreatedAt { get; set; }

    public ICollection<PlaylistMedia> PlaylistMedias { get; set; } = [];
}
