using Microsoft.EntityFrameworkCore;
using WebApi.Domain;

namespace WebApi.Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<IngredientAmount> IngredientAmount { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new RecipeConfiguration());
            builder.ApplyConfiguration(new IngredientConfiguration());
            builder.ApplyConfiguration(new IngredientAmountConfiguration());
            base.OnModelCreating(builder);
        }

    }
}
