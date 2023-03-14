using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Persistance;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Mapping));
builder.Services.AddScoped<RecipeService>();
builder.Services.AddScoped<IngredientService>();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.SetIsOriginAllowed(p => true)
        .AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});
var app = builder.Build();
app.UseCors("CorsPolicy");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();

app.Run();
