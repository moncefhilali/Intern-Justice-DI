using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Demande_Produit", Schema = "dbo")]
    public class Demande_Produit : Entity
    {
        [Column("idDemande")]
        public int idDemande { get; set; }

        [Column("idProduit")]
        public int idProduit { get; set; }

        [Column("QteDemandee")]
        public int QteDemandee { get; set; }

        [Column("QteAccordee")]
        public int? QteAccordee { get; set; }
    }
}
