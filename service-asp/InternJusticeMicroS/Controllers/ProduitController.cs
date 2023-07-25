using InternJusticeMicroS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace InternJusticeMicroS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduitController : ControllerBase
    {
        private readonly InternJusticeContext _internJusticeContext;
        public ProduitController(InternJusticeContext internJusticeContext)
        {
            _internJusticeContext = internJusticeContext;
        }

        [HttpGet("{idSousCategorie:int}")]
        public async Task<ActionResult<IEnumerable<Produit>>> GetProduits(int idSousCategorie)
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            return await _internJusticeContext.Produits.Where(w => w.idSousCategorie == idSousCategorie).ToListAsync();
        }


        // select p.id, c2.Nom, c1.Nom, p.Designation, p.Marque, p.Qte
        // from Produit p inner join Categorie c1
        // on p.idSousCategorie = c1.id
        // inner join Categorie c2
        // on c2.id = c1.idCategorieMere
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllProduits()
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                .Join(_internJusticeContext.Categories, p => p.idSousCategorie, c1 => c1.id, (p, c1) => new { Produit = p, Categorie1 = c1 })
                .Join(_internJusticeContext.Categories, pc1 => pc1.Categorie1.idCategorieMere, c2 => c2.id, (pc1, c2) => new { pc1.Produit, Categorie1 = pc1.Categorie1, Categorie2 = c2 })
                .Select(x => new
                {
                    x.Produit.id,
                    Categorie2Nom = x.Categorie2.Nom,
                    Categorie1Nom = x.Categorie1.Nom,
                    x.Produit.Designation,
                    x.Produit.Marque,
                    x.Produit.Qte
                })
                .ToListAsync();
            return result;
        }

        [HttpGet("stock")]
        public async Task<ActionResult<IEnumerable<object>>> GetStockProduits()
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                .Join(_internJusticeContext.Categories, p => p.idSousCategorie, c1 => c1.id, (p, c1) => new { Produit = p, Categorie1 = c1 })
                .Join(_internJusticeContext.Categories, pc1 => pc1.Categorie1.idCategorieMere, c2 => c2.id, (pc1, c2) => new { pc1.Produit, Categorie1 = pc1.Categorie1, Categorie2 = c2 })
                .Select(x => new
                {
                    x.Produit.id,
                    Categorie2Nom = x.Categorie2.Nom,
                    Categorie1Nom = x.Categorie1.Nom,
                    x.Produit.Designation,
                    x.Produit.Marque,
                    x.Produit.Qte
                })
                .Where(w => w.Qte >= 10)
                .ToListAsync();
            return result;
        }

        [HttpGet("rupture")]
        public async Task<ActionResult<IEnumerable<object>>> GetRuptureProduits()
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                .Join(_internJusticeContext.Categories, p => p.idSousCategorie, c1 => c1.id, (p, c1) => new { Produit = p, Categorie1 = c1 })
                .Join(_internJusticeContext.Categories, pc1 => pc1.Categorie1.idCategorieMere, c2 => c2.id, (pc1, c2) => new { pc1.Produit, Categorie1 = pc1.Categorie1, Categorie2 = c2 })
                .Select(x => new
                {
                    x.Produit.id,
                    Categorie2Nom = x.Categorie2.Nom,
                    Categorie1Nom = x.Categorie1.Nom,
                    x.Produit.Designation,
                    x.Produit.Marque,
                    x.Produit.Qte
                })
                .Where(w => w.Qte < 10 && w.Qte > 0)
                .ToListAsync();
            return result;
        }

        [HttpGet("epuise")]
        public async Task<ActionResult<IEnumerable<object>>> GetEpuiseProduits()
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                .Join(_internJusticeContext.Categories, p => p.idSousCategorie, c1 => c1.id, (p, c1) => new { Produit = p, Categorie1 = c1 })
                .Join(_internJusticeContext.Categories, pc1 => pc1.Categorie1.idCategorieMere, c2 => c2.id, (pc1, c2) => new { pc1.Produit, Categorie1 = pc1.Categorie1, Categorie2 = c2 })
                .Select(x => new
                {
                    x.Produit.id,
                    Categorie2Nom = x.Categorie2.Nom,
                    Categorie1Nom = x.Categorie1.Nom,
                    x.Produit.Designation,
                    x.Produit.Marque,
                    x.Produit.Qte
                })
                .Where(w => w.Qte == 0)
                .ToListAsync();
            return result;
        }


        // select b.idBonEntree, b.id, p.Designation
        // from Produit p inner join Produit_BonEntree b
        // on p.id = b.idProduit
        // where b.idBonEntree = 38
        [HttpGet("BE/{idBonEntree:int}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByIdProduits(int idBonEntree)
        {
            if (_internJusticeContext.Produits == null)
            {
                return NotFound();
            }
            var result = await _internJusticeContext.Produits
                                .Join(_internJusticeContext.Produit_BonEntrees, p => p.id, b => b.idProduit, (p, b) => new { p.Designation, b.Qte, b.idBonEntree, b.Observation, b.idMagasin })
                                .Where(w => w.idBonEntree == idBonEntree)
                                .ToListAsync();
            return result.Select(x => new { idBonEntree = x.idBonEntree , Designation = x.Designation, Qte = x.Qte, x.Observation, idMagasin = x.idMagasin }).ToList();
        }

    }
}
