using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain;

namespace WebApi.Persistance
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.ToTable("recipe").HasKey(p => p.Id).HasName("pk_recipe_id");
            builder.Property(p => p.Id).HasColumnName("id").ValueGeneratedOnAdd();
            builder.Property(p => p.Name).HasColumnName("name").IsRequired(true);
            builder.Property(p => p.Description).HasColumnName("description").IsRequired(false);
            builder.Property(p => p.Image).HasColumnName("image").IsRequired(false);
            builder.HasIndex(p => p.Id).HasDatabaseName("ix_recipe_id");
        }
    }
}
