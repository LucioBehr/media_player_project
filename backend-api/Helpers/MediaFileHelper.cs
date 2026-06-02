namespace backend_api.Helpers;

public static class MediaFileHelper
{
    public const string PublicFilesPath = "/medias/files";

    private static readonly HashSet<string> ImageExtensions =
        [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    private static readonly HashSet<string> VideoExtensions =
        [".mp4", ".webm", ".mov"];

    public static string GetStoragePath(IWebHostEnvironment environment) =>
        Path.Combine(environment.ContentRootPath, "Medias");

    public static string BuildPublicUrl(HttpRequest request, string storedValue)
    {
        if (storedValue.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
            || storedValue.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            return storedValue;
        }

        return $"{request.Scheme}://{request.Host}{PublicFilesPath}/{storedValue}";
    }

    public static bool IsExternalUrl(string? value) =>
        !string.IsNullOrWhiteSpace(value)
        && (value.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
            || value.StartsWith("https://", StringComparison.OrdinalIgnoreCase));

    public static async Task<string> SaveUploadedFileAsync(IFormFile file, string storagePath)
    {
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!ImageExtensions.Contains(extension) && !VideoExtensions.Contains(extension))
        {
            throw new InvalidOperationException("Tipo de arquivo não suportado.");
        }

        var storedName = $"{Guid.NewGuid()}{extension}";
        var fullPath = Path.Combine(storagePath, storedName);

        await using var stream = System.IO.File.Create(fullPath);
        await file.CopyToAsync(stream);

        return storedName;
    }

    public static void DeleteStoredFile(string storagePath, string storedValue)
    {
        if (IsExternalUrl(storedValue) || string.IsNullOrWhiteSpace(storedValue))
        {
            return;
        }

        var fullPath = Path.Combine(storagePath, storedValue);

        if (System.IO.File.Exists(fullPath))
        {
            System.IO.File.Delete(fullPath);
        }
    }
}