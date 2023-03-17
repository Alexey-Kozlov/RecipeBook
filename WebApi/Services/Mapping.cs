using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;
using WebApi.Domain;
using WebApi.Models;

namespace WebApi.Services
{
    public class Mapping2 : Profile
    {
        public Mapping2()
        {
            //если получаем список рецептов - изображения ингридиентов не нужны
            CreateMap<Recipe, RecipeDTO>()
                .ForMember(dest => dest.image, opt => opt.MapFrom(src =>
                    src.Image == null ? "" : "data:image/png;base64," + Convert.ToBase64String(src.Image!)))
                .ForMember(dest => dest.ingredients, opt => opt.Ignore())
            ;
        }
    }
    public class Mapping : Profile
    {
        public Mapping() 
        {
            //если получаем конкретный рецепт - нужны изображения ингридиентов
            CreateMap<Recipe, RecipeDTO>()
                .ForMember(dest => dest.image, opt => opt.MapFrom(src => src.Image == null ? "" : Convert.ToBase64String(src.Image!)))
                .ForMember(dest => dest.ingredients, opt => opt.MapFrom(src =>
                    src.Ingredients.Select(p => new IngredientDTO
                    {
                        name = p.Ingredient.Name,
                        ingredientId = p.IngredientId,
                        id = p.Id,
                        amount = p.Amount,
                        image = p.Ingredient.Image == null ? "" :
                        "data:image/png;base64," + Convert.ToBase64String(p.Ingredient.Image)
                    }
                )));

            CreateMap<RecipeDTO, Recipe>()
                .ForMember(dest => dest.Image, opt =>
                {
                    opt.PreCondition(s => !string.IsNullOrEmpty(s.image));
                    opt.MapFrom(src => src.image.Contains("data:image/png;base64,") ? Convert.FromBase64String(src.image.Replace("data:image/png;base64,", "")) : Convert.FromBase64String(src.image!));
                })
                .ForMember(dest => dest.Ingredients, opt => opt.MapFrom((src, dest) =>
                    {
                        return src.ingredients.Select(p => new IngredientAmount
                        {
                            Id = p.id,
                            RecipeId = dest.Id,
                            IngredientId = p.ingredientId,
                            Amount = p.amount
                        });
                    })
                );

            CreateMap<Ingredient, IngredientDTO>()
                .ForMember(dest => dest.image, opt => opt.MapFrom(src => src.Image == null ? "" :  Convert.ToBase64String(src.Image!)));

            CreateMap<IngredientDTO, Ingredient>()
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.amount))
                .ForMember(dest => dest.Image, opt =>
                {
                    opt.Condition(s => !string.IsNullOrEmpty(s.image));
                    opt.MapFrom((src, dest) =>
                    {
                        src.image = src.image!.Replace("data:image/png;base64,", "");
                        return Convert.FromBase64String(src.image!);
                    }); 
                });                
        }
    }


}
