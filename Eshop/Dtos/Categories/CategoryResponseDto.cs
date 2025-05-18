using Eshop.Dtos.Products;

namespace Eshop.Dtos.Categories;

public class CategoryResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<ProductResponseDto>? Products { get; set; }
}