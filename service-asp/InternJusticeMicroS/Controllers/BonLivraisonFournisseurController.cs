using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonLivraisonFournisseurController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public BonLivraisonFournisseurController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BonLivraisonFournisseur>>> GetBLFS()
        {
            if (_internJusticeContext.BonLivraisonFournisseurs == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.BonLivraisonFournisseurs.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BonLivraisonFournisseur>> GetByIdBonLivraisonFournisseur(int id)
        {
            if (_internJusticeContext.BonLivraisonFournisseurs == null)
            {
                return NotFound();
            }
            var BLF = await _internJusticeContext.BonLivraisonFournisseurs.FindAsync(id);
            if (BLF == null)
            {
                return NotFound();
            }
            return BLF;
        }

    }
}
