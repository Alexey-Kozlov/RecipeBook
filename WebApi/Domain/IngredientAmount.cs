namespace WebApi.Domain
{
    public class IngredientAmount
    {
        public int Id { get; set; }
        public int IngredientId { get; set; }
        public int RecipeId { get; set; }
        public decimal Amount { get; set; }
        public Ingredient Ingredient { get; set; }
        public Recipe Recipe { get; set; }
    }
}
