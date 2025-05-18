using AutoMapper;
using Eshop.Dtos.Categories;
using Eshop.Entities;
using Eshop.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{

    private readonly CategoryService _categoryService;
    private readonly IMapper _mapper;
    private readonly IValidator<CategoryRequestDto> _validator;

    public CategoriesController(CategoryService categoryService, IMapper mapper, IValidator<CategoryRequestDto> validator)
    {
        _categoryService = categoryService;
        _mapper = mapper;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _categoryService.GetAll();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryEntity>> GetCategoryById(int id)
    {
        var category = await _categoryService.GetById(id);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryEntity>> Create([FromBody] CategoryRequestDto categoryDto)
    {
        ValidationResult result = await _validator.ValidateAsync(categoryDto);
        if (!result.IsValid)
        {
            result.AddToModelState(ModelState);
            return BadRequest(ModelState);
        }
        var category = _mapper.Map<CategoryEntity>(categoryDto);
        if (category == null) return BadRequest(); // TODO: maybe 500 instead?
        var createdCategory = await _categoryService.Create(category);
        return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory);
        // return Ok(_mapper.Map<CategoryResponseDto>(category));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _categoryService.Delete(id);
        if (!success) return NotFound();
        return NoContent();
    }
}