using AutoMapper;
using Eshop.Dtos.Products;
using Eshop.Entities;
using Eshop.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{

    private readonly ProductService _productService;
    private readonly IMapper _mapper;
    private readonly IValidator<ProductRequestDto> _validator;

    public ProductsController(ProductService productService, IMapper mapper, IValidator<ProductRequestDto> validator)
    {
        _productService = productService;
        _mapper = mapper;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productService.GetAll();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductEntity>> GetProductById(int id)
    {
        var product = await _productService.GetById(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<ProductResponseDto>(product));
    }

    [HttpPost]
    public async Task<ActionResult<ProductEntity>> Create([FromBody] ProductRequestDto productDto)
    {
        ValidationResult result = await _validator.ValidateAsync(productDto);
        if (!result.IsValid)
        {
            result.AddToModelState(ModelState);
            return BadRequest(ModelState);
        }
        var product = _mapper.Map<ProductEntity>(productDto);
        if (product == null) return BadRequest(); 
        var createdProduct = await _productService.Create(product);
        return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
        
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _productService.Delete(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
