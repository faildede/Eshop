using AutoMapper;
using Eshop.Entities;
using Eshop.Dtos.Categories;

namespace Eshop.Mapping;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<CategoryEntity, CategoryRequestDto>().ReverseMap();
        CreateMap<CategoryEntity, CategoryResponseDto>().ReverseMap();
    }
}