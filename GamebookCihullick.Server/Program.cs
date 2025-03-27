using GamebookCihullick.Server.Data;
using GamebookCihullick.Server.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).IsLoopback);
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors(x => x.AllowAnyMethod().SetIsOriginAllowed(origin => new Uri(origin).IsLoopback));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

// LOGGING + TEST SEEDING
Console.WriteLine("DB Path: " + builder.Configuration.GetConnectionString("DefaultConnection"));

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var conn = db.Database.GetDbConnection();
    conn.Open();

    var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT name FROM sqlite_master WHERE type='table'";
    var reader = cmd.ExecuteReader();
    Console.WriteLine("Tables in DB:");
    while (reader.Read())
    {
        Console.WriteLine($" - {reader.GetString(0)}");
    }

    // TEST SEEDING
    Console.WriteLine("Seeding test item...");

    if (!db.Items.Any(i => i.Name == "Test Item"))
    {
        db.Items.Add(new Item
        {
            ItemID = 9999,
            Name = "Test Item",
            Description = "This is a seeded test item",
            Type = "debug",
            Cost = 0,
            IsEdible = false,
            NutritionalValue = 0,
            ShowsInInventory = true,
            ImageID = 1 // assume 1 exists
        });

        db.SaveChanges();
        Console.WriteLine("Test item seeded.");
    }
    else
    {
        Console.WriteLine("Test item already exists.");
    }
}

app.Run();
