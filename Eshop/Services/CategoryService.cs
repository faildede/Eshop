using Eshop.Data;
using Eshop.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Services;

public class CategoryService(EshopDbContext context)
{
    private readonly EshopDbContext _context = context;

    public async Task<List<CategoryEntity>> GetAll()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<CategoryEntity?> GetById(int id)
    {
        return await _context.Categories.SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<CategoryEntity> Create(CategoryEntity category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<bool> Update(int id, CategoryEntity updatedCategory)
    {
        if (await _context.Categories.FindAsync(id) is CategoryEntity found)
        {
            _context.Entry(found).CurrentValues.SetValues(updatedCategory);

            return await _context.SaveChangesAsync() > 0;
        }
        return false;
    }

    public async Task<bool> Delete(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return false;

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }
}