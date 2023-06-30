using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonComandeController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public BonComandeController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BonComande>> GetByIdBonComande(int id)
        {
            if (_internJusticeContext.BonComandes == null)
            {
                return NotFound();
            }
            var M = await _internJusticeContext.BonComandes.FindAsync(id);
            if (M == null)
            {
                return NotFound();
            }
            return M;
        }

    }
}
