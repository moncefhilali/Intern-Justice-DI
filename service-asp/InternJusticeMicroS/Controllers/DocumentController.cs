using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public DocumentController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            if (_internJusticeContext.BonEntrees == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Documents.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Document>> GetByIdDocument(int id)
        {
            if (_internJusticeContext.Documents == null)
            {
                return NotFound();
            }
            var Doc = await _internJusticeContext.Documents.FindAsync(id);
            if (Doc == null)
            {
                return NotFound();
            }
            return Doc;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Document Document)
        {
            await _internJusticeContext.Documents.AddAsync(Document);
            await _internJusticeContext.SaveChangesAsync();
            return Ok(Document.id);
        }

        [HttpPost("file/upload")]
        public async Task<ActionResult> upload(IFormFile file, [FromServices] IWebHostEnvironment environment)
        {
            if (file != null && file.Length > 0)
            {
                // Determine the file path
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(environment.ContentRootPath, "documents", fileName);

                // Save the file to the specified location
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            return Ok();
        }

        [HttpGet("file/download/{fileName}")]
        public async Task<IActionResult> Download(string fileName, [FromServices] IWebHostEnvironment environment)
        {
            var filePath = Path.Combine(environment.ContentRootPath, "documents", fileName);

            if (System.IO.File.Exists(filePath))
            {
                var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                // Determine the MIME type
                var provider = new FileExtensionContentTypeProvider();
                var contentType = provider.Mappings.TryGetValue(Path.GetExtension(filePath), out var mimeType) ? mimeType : "application/octet-stream";

                // Return the file as a stream
                return File(fileStream, contentType, fileName);
            }

            return NotFound();
        }

    }
}
