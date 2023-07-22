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


        // select c1.id, c1.Nom, c2.Nom
        // from Categorie c1 join Categorie c2
        // on c1.id = c2.idCategorieMere
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllCategories()
        {
            if (_internJusticeContext.Categories == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Categories
                .Join(_internJusticeContext.Categories, c1 => c1.id, c2 => c2.idCategorieMere, (c1, c2) => new { Categorie1 = c1, Categorie2 = c2 })
                .Select(x => new
                {
                    x.Categorie1.id,
                    Categorie1Nom = x.Categorie1.Nom,
                    Categorie2Nom = x.Categorie2.Nom
                })
                .ToListAsync();
            return result;
        }



    }
}
