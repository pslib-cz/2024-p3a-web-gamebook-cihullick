﻿// <auto-generated />
using GamebookCihullick.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241210203555_Init3")]
    partial class Init3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GamebookCihullick.Server.Models.Inventory", b =>
                {
                    b.Property<int>("PlayerID")
                        .HasColumnType("int");

                    b.Property<int>("ItemID")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("PlayerID", "ItemID");

                    b.HasIndex("ItemID");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Item", b =>
                {
                    b.Property<int>("ItemID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItemID"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("ItemID");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LocationID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LocationID");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.LocationConnection", b =>
                {
                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<int>("ConnectedLocationID")
                        .HasColumnType("int");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("bit");

                    b.HasKey("LocationID", "ConnectedLocationID");

                    b.HasIndex("ConnectedLocationID");

                    b.ToTable("LocationConnections");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Player", b =>
                {
                    b.Property<int>("PlayerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlayerID"));

                    b.Property<int>("CurrentDay")
                        .HasColumnType("int");

                    b.Property<int>("CurrentDifficulty")
                        .HasColumnType("int");

                    b.Property<int>("CurrentLevel")
                        .HasColumnType("int");

                    b.Property<bool>("HasWashingMachine")
                        .HasColumnType("bit");

                    b.Property<int>("Hunger")
                        .HasColumnType("int");

                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<decimal>("Money")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("PlayerID");

                    b.HasIndex("LocationID");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Inventory", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Item", "Item")
                        .WithMany("Inventories")
                        .HasForeignKey("ItemID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GamebookCihullick.Server.Models.Player", "Player")
                        .WithMany("Inventory")
                        .HasForeignKey("PlayerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.LocationConnection", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Location", "ConnectedLocation")
                        .WithMany()
                        .HasForeignKey("ConnectedLocationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("GamebookCihullick.Server.Models.Location", "Location")
                        .WithMany("Connections")
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ConnectedLocation");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Player", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Location", "CurrentLocation")
                        .WithMany()
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CurrentLocation");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Item", b =>
                {
                    b.Navigation("Inventories");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Location", b =>
                {
                    b.Navigation("Connections");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Player", b =>
                {
                    b.Navigation("Inventory");
                });
#pragma warning restore 612, 618
        }
    }
}
