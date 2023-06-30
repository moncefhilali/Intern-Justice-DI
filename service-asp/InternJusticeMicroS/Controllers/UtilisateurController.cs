using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using System.Security.Cryptography;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public UtilisateurController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUsers()
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Utilisateurs.ToListAsync();
        }

        [HttpGet("Info")]
        public async Task<ActionResult<IEnumerable<object>>> GetOnlyUsers()
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Utilisateurs
                                .Join(_internJusticeContext.Roles, u => u.idRole, r => r.id, (u, r) => new { u.id, u.Nom, u.Prenom, u.Ville, u.CIN, u.Entite, u.Statut, r.Libelle })
                                .ToListAsync();
            return result.ToList();
        }


        [HttpGet("CIN/{cin}")]
        public async Task<ActionResult<IEnumerable<string>>> GetByCinUtilisateur(string cin)
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Utilisateurs.Where(w => w.CIN == cin).Select(u => u.CIN).ToListAsync();
        }

        [HttpGet("Email/{email}")]
        public async Task<ActionResult<IEnumerable<string>>> GetByEmailUtilisateur(string email)
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Utilisateurs.Where(w => w.Email == email).Select(u => u.Email).ToListAsync();
        }

        [HttpGet("SignIn")]
        public async Task<ActionResult<Utilisateur>> GetBySignInUtilisateur(string email, string pass)
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }
            var CheckUser = await _internJusticeContext.Utilisateurs.Where(w => w.Email == email).Where(w => w.Pass == pass).ToListAsync();
            if (CheckUser.Count > 0)
            {
                var user = CheckUser.First();
                var newUtilisateur = new Utilisateur
                {
                    id = user.id,
                    idRole = user.idRole,
                    Nom = user.Nom,
                    Prenom = user.Prenom,
                    Entite = user.Entite,
                    Email = user.Email,
                    Statut = user.Statut
                };
                newUtilisateur.Pass = CreateSaltToken();

                return newUtilisateur;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Utilisateur utilisateur)
        {
            await _internJusticeContext.Utilisateurs.AddAsync(utilisateur);
            await _internJusticeContext.SaveChangesAsync();
            return Ok(utilisateur.id);
        }


        private string CreateSaltToken()
        {
            using (var hmac = new HMACSHA512())
            {
                byte[] saltToken = hmac.Key;
                string hexString = BitConverter.ToString(saltToken).Replace("-", string.Empty);
                return hexString;
            }
        }

        [HttpPut("Accept/{id}")]
        public async Task<ActionResult<IEnumerable<string>>> AcceptUser(int id)
        {
            if (_internJusticeContext.Utilisateurs == null)
            {
                return NotFound();
            }

            var User = await _internJusticeContext.Utilisateurs.FindAsync(id);

            if (User == null)
            {
                return NotFound();
            }

            User.Statut = "Validé";
            await _internJusticeContext.SaveChangesAsync();

            return NoContent();
        }

    }
}
