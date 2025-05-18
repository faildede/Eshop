using Eshop.Data;
using Eshop.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Services;

public class ProductService(EshopDbContext context)
{
    private readonly EshopDbContext _context = context;

    public async Task<List<ProductEntity>> GetAll(bool includeCategory = false)
    {
        return includeCategory
            ? await _context.Products.Include(p => p.Category).ToListAsync()
            : await _context.Products.ToListAsync();

    }

    public async Task<ProductEntity?> GetById(int id, bool includeCategory = false)
    {
        return includeCategory
            ? await _context.Products.Include(p => p.Category).SingleOrDefaultAsync(p => p.Id == id)
            : await _context.Products.SingleOrDefaultAsync(p => p.Id == id);
    }

    public async Task<ProductEntity> Create(ProductEntity product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    // public async Task<bool> Update(int id, Product updatedProduct)
    // {
    //     var product = await _context.Products.FindAsync(id);
    //     if (product == null) return false;

    //     product.Title = updatedProduct.Title;
    //     product.Description = updatedProduct.Description;
    //     product.Price = updatedProduct.Price;

    //     await _context.SaveChangesAsync();
    //     return true;
    // }

    public async Task<bool> Update(int id, ProductEntity updatedProduct)
    {
        if (await _context.Products.FindAsync(id) is ProductEntity found)
        {
            _context.Entry(found).CurrentValues.SetValues(updatedProduct);

            return await _context.SaveChangesAsync() > 0;
        }
        return false;
    }

    public async Task<bool> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}