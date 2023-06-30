using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Role", Schema = "dbo")]
    public class Role : Entity
    {
        [Column("Libelle")]
        public string Libelle { get; set; }

    }

}
