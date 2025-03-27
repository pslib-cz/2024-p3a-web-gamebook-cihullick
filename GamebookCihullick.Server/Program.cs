using GamebookCihullick.Server.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine(" Starting to configure services...");

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    Console.WriteLine($" Configuring DbContext with connection string: {connectionString}");
    options.UseSqlite(connectionString);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).IsLoopback);
    });
});

Console.WriteLine(" Service configuration complete.");

var app = builder.Build();

Console.WriteLine(" App built successfully.");

// Static files & CORS
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors(x => x.AllowAnyMethod().SetIsOriginAllowed(origin => new Uri(origin).IsLoopback));

if (app.Environment.IsDevelopment())
{
    Console.WriteLine(" Development environment detected: enabling Swagger");
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

//  Debug: DB check
Console.WriteLine(" Checking DB connection and listing tables...");

try
{
    Console.WriteLine(" DB Path: " + builder.Configuration.GetConnectionString("DefaultConnection"));
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var conn = db.Database.GetDbConnection();
        conn.Open();

        var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT name FROM sqlite_master WHERE type='table'";
        var reader = cmd.ExecuteReader();

        Console.WriteLine(" Tables in DB:");
        while (reader.Read())
        {
            Console.WriteLine($" {reader.GetString(0)}");
        }

        conn.Close();
    }
}
catch (Exception ex)
{
    Console.WriteLine($" Error while connecting to DB: {ex.Message}");
}

Console.WriteLine(" App startup complete. Ready to handle requests.");

app.Run();
