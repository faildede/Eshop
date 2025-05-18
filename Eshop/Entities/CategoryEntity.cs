namespace Eshop.Entities;

public class CategoryEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<ProductEntity> Products { get; } = [];
}