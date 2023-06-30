using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Produit_BonEntree", Schema = "dbo")]
    public class Produit_BonEntree : Entity
    {
        [Column("idBonEntree")]
        public int idBonEntree { get; set; }

        [Column("idProduit")]
        public int idProduit { get; set; }

        [Column("idMagasin")]
        public int idMagasin { get; set; }

        [Column("Qte")]
        public int Qte { get; set; }

        [Column("Observation")]
        public string Observation { get; set; }
    }
}
