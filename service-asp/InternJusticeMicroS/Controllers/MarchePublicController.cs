using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarchePublicController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public MarchePublicController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MarchePublic>> GetByIdMarchePublic(int id)
        {
            if (_internJusticeContext.MarchePublics == null)
            {
                return NotFound();
            }
            var M = await _internJusticeContext.MarchePublics.FindAsync(id);
            if (M == null)
            {
                return NotFound();
            }
            return M;
        }

    }
}
