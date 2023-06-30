using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduitController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public ProduitController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet("{idSousCategorie:int}")]
        public async Task<ActionResult<IEnumerable<Produit>>> GetProduits(int idSousCategorie)
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Produits.Where(w => w.idSousCategorie == idSousCategorie).ToListAsync();
        }


        // select b.idBonEntree, b.id, p.Designation
        // from Produit p inner join Produit_BonEntree b
        // on p.id = b.idProduit
        // where b.idBonEntree = 38
        [HttpGet("BE/{idBonEntree:int}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByIdProduits(int idBonEntree)
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                                .Join(_internJusticeContext.Produit_BonEntrees, p => p.id, b => b.idProduit, (p, b) => new { p.Designation, b.Qte, b.idBonEntree, b.Observation, b.idMagasin })
                                .Where(w => w.idBonEntree == idBonEntree)
                                .ToListAsync();
            return result.Select(x => new { idBonEntree = x.idBonEntree , Designation = x.Designation, Qte = x.Qte, x.Observation, idMagasin = x.idMagasin }).ToList();
        }

    }
}
