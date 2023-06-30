using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InternJusticeMicroS.Models
{
    public class Entity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        //IdCreerPqr
        //DATECREATION
        //idmodifpar
        //DATEMODIFICATION
    }
}
