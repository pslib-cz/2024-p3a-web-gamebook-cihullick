using GamebookCihullick.Server.Data;
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

// Log DB path and file size
Console.WriteLine("DB Path: " + builder.Configuration.GetConnectionString("DefaultConnection"));

var dbFile = new FileInfo("/data/WashingDB.db");
if (dbFile.Exists)
{
    Console.WriteLine($"Actual DB file size (on disk): {dbFile.Length} bytes");
}
else
{
    Console.WriteLine(" DB file does not exist at runtime path!");
}

// Show tables
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
}

app.Run();
