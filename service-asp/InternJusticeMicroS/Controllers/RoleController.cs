using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public RoleController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            if (_internJusticeContext.Roles == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Roles.ToListAsync();
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<Role>> GetByIdRole(int id)
        {
            if (_internJusticeContext.Roles == null)
            {
                return NotFound();
            }
            var role = await _internJusticeContext.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return role;
        }

    }
}
