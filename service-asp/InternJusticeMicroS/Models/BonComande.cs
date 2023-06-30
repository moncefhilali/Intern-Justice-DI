using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("BonComande", Schema = "dbo")]
    public class BonComande : Entity
    {
        [Column("nBonComande")]
        public string nBonComande { get; set; }
    }
}
