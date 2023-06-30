using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("BonLivraisonFournisseur", Schema = "dbo")]
    public class BonLivraisonFournisseur : Entity
    {

        [Column("dateBonLivraison")]
        public DateTime dateBonLivraison { get; set; }

        [Column("Fournisseur")]
        public string Fournisseur { get; set; }

    }
}
