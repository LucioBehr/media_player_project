using backend_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Media> Medias => Set<Media>();

    public DbSet<Playlist> Playlists => Set<Playlist>();

    public DbSet<PlaylistMedia> PlaylistMedias => Set<PlaylistMedia>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Media>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Name).HasMaxLength(200).IsRequired();
            entity.Property(m => m.Description).HasMaxLength(2000);
            entity.Property(m => m.FileName).HasMaxLength(500).IsRequired();
            entity.Property(m => m.Type).HasConversion<string>();
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Description).HasMaxLength(2000);
        });

        modelBuilder.Entity<PlaylistMedia>(entity =>
        {
            entity.HasKey(pm => new { pm.PlaylistId, pm.MediaId });

            entity.HasOne(pm => pm.Playlist)
                .WithMany(p => p.PlaylistMedias)
                .HasForeignKey(pm => pm.PlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(pm => pm.Media)
                .WithMany()
                .HasForeignKey(pm => pm.MediaId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(pm => new { pm.PlaylistId, pm.Order });
        });
    }
}
