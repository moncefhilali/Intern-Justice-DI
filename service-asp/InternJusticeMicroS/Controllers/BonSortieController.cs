using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonSortieController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public BonSortieController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpPost]
        public async Task<ActionResult> Create(BonSortie bonSortie)
        {
            await _internJusticeContext.BonSorties.AddAsync(bonSortie);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BonSortie>>> GetBonsSortie()
        {
            if (_internJusticeContext.BonSorties == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.BonSorties.ToListAsync();
        }

    }
}
