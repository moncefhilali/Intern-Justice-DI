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

            // Create a new Historique_Demande object and set its properties
            Historique_Demande Historique = new Historique_Demande
            {
                idDemande = Demande.id,
                idUtilisateur = Demande.Demandeur,
                Statut = "Créé",
                dateCreation = DateTime.Today
            };

            // Add the Historique_Demande object to the context and save changes
            _internJusticeContext.Historique_Demandes.Add(Historique);
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


        //select d.id, u.cin, u.Nom, u.Prenom, u.Entite, d.dateDemande, d.Statut
        //from Demande d join Utilisateur u
        //on d.Demandeur = u.id
        [HttpGet("info")]
        public async Task<ActionResult<IEnumerable<object>>> GetDemandesInfo()
        {
            if (_internJusticeContext.Demandes == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Demandes
                    .Join(_internJusticeContext.Utilisateurs, d => d.Demandeur, u => u.id, (d, u) => new { d.id, u.CIN, u.Nom, u.Prenom, u.Entite, d.dateDemande, d.Statut })
                    .ToListAsync();
            return result.Select(x => new { x.id, x.CIN, x.Nom, x.Prenom, x.Entite, x.dateDemande, x.Statut }).ToList();
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

        [HttpPut]
        public async Task<ActionResult> Update(Demande demande, int UpdatedBy)
        {
            // Find the existing entity in the database
            var existingEntity = await _internJusticeContext.Demandes.FindAsync(demande.id);

            if (existingEntity != null)
            {
                // Update the 'Statut' property of the existing entity
                existingEntity.Statut = demande.Statut;
                await _internJusticeContext.SaveChangesAsync();
            }

            // Create a new Historique_Demande object and set its properties
            Historique_Demande Historique = new Historique_Demande
            {
                idDemande = demande.id,
                idUtilisateur = UpdatedBy,
                Statut = demande.Statut,
                dateCreation = DateTime.Today
            };

            // Add the Historique_Demande object to the context and save changes
            _internJusticeContext.Historique_Demandes.Add(Historique);
            await _internJusticeContext.SaveChangesAsync();

            return Ok();
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
