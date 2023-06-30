using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategorieController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public CategorieController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorie>>> GetCategoriesMere()
        {
            if (_internJusticeContext.Categories == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Categories.Where(w => w.idCategorieMere == null).ToListAsync();
        }

        [HttpGet("{idCategorieMere:int}")]
        public async Task<ActionResult<IEnumerable<Categorie>>> GetSousCategories(int idCategorieMere)
        {
            if (_internJusticeContext.Categories == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Categories.Where(w => w.idCategorieMere == idCategorieMere).ToListAsync();
        }



    }
}
