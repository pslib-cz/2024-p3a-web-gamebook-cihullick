using Microsoft.EntityFrameworkCore;
using GamebookCihullick.Server.Models;

namespace GamebookCihullick.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationConnection> LocationConnections { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<NPC> NPCs { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<LocationConnection>()
                .HasKey(lc => new { lc.LocationID, lc.ConnectedLocationID });

            modelBuilder.Entity<LocationConnection>()
                .HasOne(lc => lc.Location)
                .WithMany(l => l.Connections)
                .HasForeignKey(lc => lc.LocationID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LocationConnection>()
                .HasOne(lc => lc.ConnectedLocation)
                .WithMany()
                .HasForeignKey(lc => lc.ConnectedLocationID)
                .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<GamebookCihullick.Server.Models.Achievement> Achievement { get; set; } = default!;

    }
}
