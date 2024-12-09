using Microsoft.EntityFrameworkCore;
using GamebookCihullick.Server.Models;

namespace GamebookCihullick.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<LocationConnection> LocationConnections { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite Key Configuration for Inventory
            modelBuilder.Entity<Inventory>()
                .HasKey(i => new { i.PlayerID, i.ItemID });

            modelBuilder.Entity<LocationConnection>()
                .HasKey(lc => new { lc.LocationID, lc.ConnectedLocationID });

            // Other configurations like LocationConnection
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

    }
}
