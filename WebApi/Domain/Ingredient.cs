namespace WebApi.Domain
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public IngredientAmount[] IngredientAmount{ get; set;}

    }
}
