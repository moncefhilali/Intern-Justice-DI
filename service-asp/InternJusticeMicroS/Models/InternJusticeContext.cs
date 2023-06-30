using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace InternJusticeMicroS.Models
{
    public class InternJusticeContext : DbContext
    {
        public InternJusticeContext(DbContextOptions<InternJusticeContext> dbContextOptions) : base(dbContextOptions)
        {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect()) databaseCreator.Create();
                    if (!databaseCreator.HasTables()) databaseCreator.CreateTables();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public DbSet<BonLivraisonFournisseur> BonLivraisonFournisseurs { get; set; }
        public DbSet<Magasin> Magasins { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Produit> Produits { get; set; }
        public DbSet<BonEntree> BonEntrees { get; set; }
        public DbSet<Produit_BonEntree> Produit_BonEntrees { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Demande> Demandes { get; set; }
        public DbSet<Demande_Produit> Demande_Produits { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<MarchePublic> MarchePublics { get; set; }
        public DbSet<BonComande> BonComandes { get; set; }
    }
}
