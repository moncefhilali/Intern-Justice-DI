using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("Document", Schema = "dbo")]
    public class Document : Entity
    {
        [Column("idCreePar")]
        public int? idCreePar { get; set; }

        [Column("idModifierPar")]
        public int? idModifierPar { get; set; }

        [Column("Chemin")]
        public string? Chemin { get; set; }

        [Column("dateCreation")]
        public DateTime? dateCreation { get; set; }

        [Column("dateModification")]
        public DateTime? dateModification { get; set; }
    }
}
