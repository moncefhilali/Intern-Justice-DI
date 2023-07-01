using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Demande", Schema = "dbo")]
    public class Demande : Entity
    {

        [Column("Demandeur")]
        public int Demandeur { get; set; }

        [Column("dateDemande")]
        public DateTime dateDemande { get; set; }

        [Column("Statut")]
        public string Statut { get; set; }
    }
}
