using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    [Table("BonEntree", Schema = "dbo")]
    public class BonSortie : Entity
    {
        [Column("idDocument")]
        public int? idDocument { get; set; }

        [Column("idDemande")]
        public int idDemande { get; set; }

        [Column("idCreePar")]
        public int idCreePar { get; set; }

        [Column("dateSortie")]
        public DateTime dateSortie { get; set; }

        [Column("dateCreation")]
        public DateTime dateCreation { get; set; }
    }
}
