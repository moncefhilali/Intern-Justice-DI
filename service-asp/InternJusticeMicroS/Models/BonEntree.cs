using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("BonEntree", Schema = "dbo")]
    public class BonEntree : Entity
    {
        [Column("idDocument")]
        public int? idDocument { get; set; }

        [Column("idMarchePublic")]
        public int? idMarchePublic { get; set; }

        [Column("idBonComande")]
        public int? idBonComande { get; set; }

        [Column("idBonLivraison")]
        public int idBonLivraison { get; set; }

        [Column("nDepense")]
        public int nDepense { get; set; }

        [Column("dateBonEntree")]
        public DateTime? dateBonEntree { get; set; }

        [Column("typeBonEntree")]
        public string typeBonEntree { get; set; }

        [Column("Statut")]
        public string? Statut { get; set; }
    }
}
