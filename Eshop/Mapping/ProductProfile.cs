using AutoMapper;
using Eshop.Entities;
using Eshop.Dtos.Products;

namespace Eshop.Mapping;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<ProductEntity, ProductRequestDto>().ReverseMap();
        CreateMap<ProductEntity, ProductResponseDto>().ReverseMap();
    }
}