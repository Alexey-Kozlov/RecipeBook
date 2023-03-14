namespace WebApi.Models
{
    public class IngredientDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public decimal amount { get; set; }
        public string? image { get; set; }
        public int size { get; set; }
    }
}
