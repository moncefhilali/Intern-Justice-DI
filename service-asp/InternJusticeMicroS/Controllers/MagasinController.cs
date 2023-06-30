using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagasinController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public MagasinController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Magasin>>> GetMagasins()
        {
            if (_internJusticeContext.Magasins == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Magasins.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Magasin>> GetByIdMagasin(int id)
        {
            if (_internJusticeContext.Magasins == null)
            {
                return NotFound();
            }
            var M = await _internJusticeContext.Magasins.FindAsync(id);
            if (M == null)
            {
                return NotFound();
            }
            return M;
        }

    }
}
