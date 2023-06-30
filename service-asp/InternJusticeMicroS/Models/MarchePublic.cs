using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("MarchePublic", Schema = "dbo")]
    public class MarchePublic : Entity
    {
        [Column("nMarchePublic")]
        public string nMarchePublic { get; set; }
    }
}
