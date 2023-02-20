using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain;

namespace WebApi.Persistance
{
    public class IngredientAmountConfiguration : IEntityTypeConfiguration<IngredientAmount>
    {
        public void Configure(EntityTypeBuilder<IngredientAmount> builder)
        {
            builder.ToTable("ingredientamount").HasKey(p => p.Id).HasName("pk_ingredientamount_id");
            builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedOnAdd();
            builder.Property(p => p.Amount).HasColumnName("amount").IsRequired(true);
            builder.HasOne(p => p.Ingredient).WithMany(p => p.IngredientAmount)
                .HasForeignKey(p => p.IngredientId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_IngredientAmount_Ingredient_IngredientId");
            builder.HasOne(p => p.Recipe).WithMany(p => p.Ingredients)
                .HasForeignKey(p => p.RecipeId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_IngredientsAmount_Recipe_RecipeId");
            builder.HasIndex(p => p.Id).HasDatabaseName("ix_inggedientamount_id");
            builder.HasIndex(p => p.IngredientId).HasDatabaseName("ix_inggedientamount_ingredientid");
            builder.HasIndex(p => p.RecipeId).HasDatabaseName("ix_inggedientamount_recipeid");
        }
    }
}
