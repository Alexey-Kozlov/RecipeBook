namespace WebApi.Domain
{
    public class Recipe
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public List<IngredientAmount> Ingredients { get; set; } = new List<IngredientAmount>();
    }
}
