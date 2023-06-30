using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Produit_BonEntreeController : ControllerBase
    {
     
        private readonly InternJusticeContext _internJusticeContext;
        public Produit_BonEntreeController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produit_BonEntree>>> GetProduitsBonEntree()
        {
            if (_internJusticeContext.Produit_BonEntrees == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Produit_BonEntrees.ToListAsync();
        }

        [HttpGet("{idBonEntree:int}")]
        public async Task<ActionResult<IEnumerable<Produit_BonEntree>>> GetByIdProduitsBonEntree(int idBonEntree)
        {
            if (_internJusticeContext.Produit_BonEntrees == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Produit_BonEntrees.Where(w => w.idBonEntree == idBonEntree).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Create(Produit_BonEntree ProduitBE)
        {
            await _internJusticeContext.Produit_BonEntrees.AddAsync(ProduitBE);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }
    }
}
