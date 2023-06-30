using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public DemandeController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Demande Demande)
        {
            await _internJusticeContext.Demandes.AddAsync(Demande);
            await _internJusticeContext.SaveChangesAsync();
            return Ok(Demande.id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demande>>> GetDemandes()
        {
            if (_internJusticeContext.Demandes == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Demandes.ToListAsync();
        }

        [HttpGet("{demandeur:int}")]
        public async Task<ActionResult<IEnumerable<Demande>>> GetByIdDemande(int demandeur)
        {
            if (_internJusticeContext.Demandes == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Demandes.Where(w => w.Demandeur == demandeur).ToListAsync();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDemande(int id)
        {
            if (_internJusticeContext.Demandes == null)
            {
                return NotFound();
            }
            var dem = await _internJusticeContext.Demandes.FindAsync(id);
            if (dem == null)
            {
                return NotFound();
            }

            _internJusticeContext.Demandes.Remove(dem);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }
    }
}
