namespace backend_api.Entities;

public class Media
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public MediaType Type { get; set; }

    public string FileName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}
