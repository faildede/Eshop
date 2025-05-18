using Eshop.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data;

public class EshopDbContext(DbContextOptions<EshopDbContext> options) : DbContext(options)
{
    public required DbSet<ProductEntity> Products { get; set; }
    public required DbSet<CategoryEntity> Categories { get; set; }
}
