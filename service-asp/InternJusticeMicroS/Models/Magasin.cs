using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Magasin", Schema = "dbo")]
    public class Magasin : Entity
    {
        

        [Column("Nom")]
        public string Nom { get; set; }

        [Column("Capacite")]
        public int Capacite { get; set; }
    }
}
