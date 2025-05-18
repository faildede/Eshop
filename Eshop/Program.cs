using Eshop.Data;
using Eshop.Dtos.Products;
using Eshop.Dtos.Categories;
using Eshop.Services;
using Eshop.Validators;
using FluentValidation;
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var accessKey = builder.Configuration.GetValue<string>("Minio:AccessKey");
var secretKey = builder.Configuration.GetValue<string>("Minio:SecretKey");
var endpoint = builder.Configuration.GetValue<string>("Minio:Endpoint");

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        });

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


builder.Services.AddDbContext<EshopDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<ProductService>();

builder.Services.AddScoped<IValidator<ProductRequestDto>, ProductRequestDtoValidator>();

builder.Services.AddScoped<CategoryService>();

builder.Services.AddScoped<IValidator<CategoryRequestDto>, CategoryRequestDtoValidator>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("AllowLocalhost3000");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
