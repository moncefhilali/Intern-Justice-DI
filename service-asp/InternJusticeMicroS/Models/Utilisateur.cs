using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Utilisateur", Schema = "dbo")]
    public class Utilisateur : Entity
    {
        [Column("idRole")]
        public int idRole { get; set; }

        [Column("Nom")]
        public string Nom { get; set; }

        [Column("Prenom")]
        public string Prenom { get; set; }

        [Column("Ville")]
        public string Ville { get; set; }

        [Column("CIN")]
        public string CIN { get; set; }

        [Column("Entite")]
        public string Entite { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("Pass")]
        public string Pass { get; set; }

        [Column("Statut")]
        public string Statut { get; set; }

    }
}
