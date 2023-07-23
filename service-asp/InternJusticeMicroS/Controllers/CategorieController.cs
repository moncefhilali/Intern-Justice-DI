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
        // from Categorie c1 left join Categorie c2
        // on c1.idCategorieMere = c2.id
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllCategories()
        {
            if (_internJusticeContext.Categories == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Categories
                .GroupJoin(
                    _internJusticeContext.Categories,
                    c1 => c1.idCategorieMere,
                    c2 => c2.id,
                    (c1, c2List) => new { Categorie1 = c1, Categorie2List = c2List }
                )
                .SelectMany(
                    x => x.Categorie2List.DefaultIfEmpty(),
                    (parent, child) => new
                    {
                        parent.Categorie1.id,
                        Categorie1Nom = parent.Categorie1.Nom,
                        Categorie2Nom = (child == null) ? null : child.Nom
                    }
                )
                .ToListAsync();
            return result;
        }


        [HttpPut]
        public async Task<ActionResult> Update(int _id, string _Nom)
        {
            // Find the existing entity in the database
            var existingEntity = await _internJusticeContext.Categories.FindAsync(_id);

            if (existingEntity != null)
            {
                // Update the 'Nom' property of the existing entity
                existingEntity.Nom = _Nom;
                await _internJusticeContext.SaveChangesAsync();

                return Ok();
            }
            return NotFound();
        }



    }
}
