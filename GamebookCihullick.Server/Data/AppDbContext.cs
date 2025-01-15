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
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (entityType.ClrType == typeof(Image))
                    continue;

                if (entityType.ClrType.GetProperty("ImageID") != null)
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .HasOne(typeof(Image), "Image")
                        .WithMany()
                        .HasForeignKey("ImageID");

                    modelBuilder.Entity(entityType.ClrType)
                        .Navigation("Image")
                        .AutoInclude();
                }
            }

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



    }
}
