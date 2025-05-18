using Eshop.Dtos.Categories;

namespace Eshop.Dtos.Products;

public class ProductResponseDto
{
    // public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Image { get; set; }
    public int Price { get; set; }
    public int CategoryId { get; set; }
    public required CategoryResponseDto? Category { get; set; }
}
