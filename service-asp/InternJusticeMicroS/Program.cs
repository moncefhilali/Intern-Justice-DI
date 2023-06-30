using InternJusticeMicroS.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();


/* Database Context Dependency Injection */
var dbHost = "localhost";
var dbName = "Intern_Justice_DI";
var dbUser = "sa";
var dbPassword = "1234"; // appsettings
var connectionString = $"server={dbHost}; database={dbName}; User ID={dbUser}; Password={dbPassword}; MultipleActiveResultSets=True; TrustServerCertificate=True;";
builder.Services.AddDbContext<InternJusticeContext>(opt => opt.UseSqlServer(connectionString));
/* ====================================== */


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
