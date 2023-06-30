using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonEntreeController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public BonEntreeController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BonEntree>>> GetBonEntrees()
        {
            if (_internJusticeContext.BonEntrees == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.BonEntrees.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Create(BonEntree BonEntree)
        {
            await _internJusticeContext.BonEntrees.AddAsync(BonEntree);
            await _internJusticeContext.SaveChangesAsync();
            return Ok(BonEntree.id);
        }

        [HttpPut]
        public async Task<ActionResult> Update(BonEntree bonEntree)
        {
            _internJusticeContext.BonEntrees.Update(bonEntree);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }


    }
}
