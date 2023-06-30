using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Categorie", Schema = "dbo")]
    public class Categorie : Entity
    {
        [Column("Nom")]
        public string Nom { get; set; }

        [Column("idCategorieMere")]
        public int? idCategorieMere { get; set; }


        // public Categorie CategorieMere { get; set; }
        // public IList<Categorie> SousCategorie { get; set; }
    }
}
