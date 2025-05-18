using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers;

[ApiController]
[Route("[controller]")]
public class FilesController : ControllerBase
{

    [HttpGet("download/{filename}")]
    public async Task<ActionResult<byte[]>> GetImageById(string filename)
    {
        var filePath = Path.Combine("Uploads", filename);

        if (!System.IO.File.Exists(filePath))
            return NotFound();

        var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(bytes, "application/octet-stream", filename);
    }

    [HttpPost("upload")]
    public async Task<ActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Файл не выбран");

        var filename = Guid.NewGuid().ToString() + "." + file.FileName.Split(".").Last();

        var filePath = Path.Combine("Uploads", filename);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { filename });
    }

    [HttpPost("upload-multiple")]
    public async Task<IActionResult> UploadFiles(List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
        {
            return BadRequest("Файлы не выбраны.");
        }

        var uploadedFiles = new List<string>();

        foreach (var file in files)
        {
            var filename = Guid.NewGuid().ToString() + "." + file.FileName.Split(".").Last();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "uploads", filename);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            uploadedFiles.Add(file.FileName);
        }

        return Ok(new { uploadedFiles });
    }


    [HttpDelete("delete/{filename}")]
    public IActionResult Delete(string filename)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", filename);

        Console.WriteLine(filePath);

        if (!System.IO.File.Exists(filePath))
            return NotFound("Файл не найден");

        System.IO.File.Delete(filePath);
        return Ok("Файл удалён");
    }
}