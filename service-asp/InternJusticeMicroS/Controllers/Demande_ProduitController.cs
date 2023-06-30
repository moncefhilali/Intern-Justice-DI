using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Demande_ProduitController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public Demande_ProduitController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Demande_Produit demandeProduit)
        {
            await _internJusticeContext.Demande_Produits.AddAsync(demandeProduit);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{idDemande:int}")]
        public async Task<ActionResult<IEnumerable<Demande_Produit>>> GetByIdProduitsDemande(int idDemande)
        {
            if (_internJusticeContext.Demande_Produits == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Demande_Produits.Where(w => w.idDemande == idDemande).ToListAsync();
        }

        //select d.id, d.idDemande, d.idProduit, p.Designation, d.QteDemandee, d.QteAccordee
        //from Demande_Produit d join Produit p
        //on d.idProduit = p.id
        //where idDemande = 1
        [HttpGet("Produits/{idDemande:int}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByIdDemandeProduits(int idDemande)
        {
            if (_internJusticeContext.Demande_Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Demande_Produits
                                .Join(_internJusticeContext.Produits, d => d.idProduit, p => p.id, (d, p) => new { d.id,d.idDemande,d.idProduit,p.Designation,d.QteDemandee,d.QteAccordee })
                                .Where(w => w.idDemande == idDemande)
                                .ToListAsync();
            return result.Select(x => new { x.id, x.idDemande, x.idProduit, x.Designation, x.QteDemandee, x.QteAccordee }).ToList();
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDemandeProduits(int id)
        {
            if (_internJusticeContext.Demande_Produits == null)
            {
                return NotFound();
            }
            var demP = await _internJusticeContext.Demande_Produits.FindAsync(id);
            if (demP == null)
            {
                return NotFound();
            }

            _internJusticeContext.Demande_Produits.Remove(demP);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("Produits/{idDocument:int}")]
        public async Task<IActionResult> DeleteByIdDemande(int idDemande)
        {
            if (_internJusticeContext.Demande_Produits == null)
            {
                return NotFound();
            }
            var demP = await _internJusticeContext.Demande_Produits.Where(w => w.idDemande == idDemande).ToListAsync();
            if (demP == null)
            {
                return NotFound();
            }

            _internJusticeContext.Demande_Produits.RemoveRange(demP);
            await _internJusticeContext.SaveChangesAsync();
            return Ok();
        }
    }
}
