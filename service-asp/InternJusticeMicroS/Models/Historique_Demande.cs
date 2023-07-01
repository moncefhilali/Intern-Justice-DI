using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Historique_Demande", Schema = "dbo")]
    public class Historique_Demande : Entity
    {
        [Column("idDemande")]
        public int idDemande { get; set; }

        [Column("idUtilisateur")]
        public int idUtilisateur { get; set; }

        [Column("Statut")]
        public string? Statut { get; set; }

        [Column("dateCreation")]
        public DateTime dateCreation { get; set; }
    }
}
