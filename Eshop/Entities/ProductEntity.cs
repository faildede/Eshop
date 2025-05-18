namespace Eshop.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Image { get; set; }
    public int Price { get; set; }
    public int CategoryId { get; set; }
    public required CategoryEntity Category { get; set; }
}
