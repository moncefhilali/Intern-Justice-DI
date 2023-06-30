using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Hosting;

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

    }
}
