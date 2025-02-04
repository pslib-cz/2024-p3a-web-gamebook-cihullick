﻿// <auto-generated />
using GamebookCihullick.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250202202306_TYPEs")]
    partial class TYPEs
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("GamebookCihullick.Server.Models.Achievement", b =>
                {
                    b.Property<int>("AchievementID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("AchievementID");

                    b.HasIndex("ImageID");

                    b.ToTable("Achievements");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Customer", b =>
                {
                    b.Property<int>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Budget")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("CustomerID");

                    b.HasIndex("ImageID");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Image", b =>
                {
                    b.Property<int>("ImageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("PathToFile")
                        .HasColumnType("TEXT");

                    b.HasKey("ImageID");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Inventory", b =>
                {
                    b.Property<int>("InventoryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LocationID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("InventoryID");

                    b.HasIndex("ImageID");

                    b.HasIndex("LocationID");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Item", b =>
                {
                    b.Property<int>("ItemID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Cost")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("IsEdible")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("NutritionalValue")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("ShowsInInventory")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("ItemID");

                    b.HasIndex("ImageID");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("LocationID");

                    b.HasIndex("ImageID");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.LocationConnection", b =>
                {
                    b.Property<int>("LocationID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ConnectedLocationID")
                        .HasColumnType("INTEGER");

                    b.HasKey("LocationID", "ConnectedLocationID");

                    b.HasIndex("ConnectedLocationID");

                    b.ToTable("LocationConnections");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.NPC", b =>
                {
                    b.Property<int>("NPCID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("BlockedLocationID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dialog")
                        .HasColumnType("TEXT");

                    b.Property<int>("ImageID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LocationID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("RequiredItemID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("NPCID");

                    b.HasIndex("BlockedLocationID");

                    b.HasIndex("ImageID");

                    b.HasIndex("LocationID");

                    b.HasIndex("RequiredItemID");

                    b.ToTable("NPCs");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Achievement", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Customer", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Inventory", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GamebookCihullick.Server.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Item", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Location", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
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

            modelBuilder.Entity("GamebookCihullick.Server.Models.NPC", b =>
                {
                    b.HasOne("GamebookCihullick.Server.Models.Location", "BlockedLocation")
                        .WithMany()
                        .HasForeignKey("BlockedLocationID");

                    b.HasOne("GamebookCihullick.Server.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GamebookCihullick.Server.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GamebookCihullick.Server.Models.Item", "RequiredItem")
                        .WithMany()
                        .HasForeignKey("RequiredItemID");

                    b.Navigation("BlockedLocation");

                    b.Navigation("Image");

                    b.Navigation("Location");

                    b.Navigation("RequiredItem");
                });

            modelBuilder.Entity("GamebookCihullick.Server.Models.Location", b =>
                {
                    b.Navigation("Connections");
                });
#pragma warning restore 612, 618
        }
    }
}
