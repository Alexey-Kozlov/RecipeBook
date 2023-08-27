using WebApi.Domain;

namespace WebApi.Models
{
    public class RecipeDTO
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public string? image { get; set; }
        public List<IngredientDTO> ingredients { get; set; } = new List<IngredientDTO>();
    }
}
