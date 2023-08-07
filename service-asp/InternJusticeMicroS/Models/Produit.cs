using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Produit", Schema = "dbo")]
    public class Produit : Entity
    {
        [Column("idSousCategorie")]
        public int? idSousCategorie { get; set; }

        [Column("Designation")]
        public string Designation { get; set; }

        [Column("Qte")]
        public int Qte { get; set; }

        [Column("Marque")]
        public string Marque { get; set; }

        [Column("Unite")]
        public string Unite { get; set; }

        [Column("Prix")]
        public double Prix { get; set; }
    }
}
