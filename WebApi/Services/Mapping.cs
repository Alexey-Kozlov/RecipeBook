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
                "data:image/png;base64," + Convert.ToBase64String(src.Image!)))
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
                .ForMember(dest => dest.image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image!)))
                .ForMember(dest => dest.ingredients, opt => opt.MapFrom(src =>
                    src.Ingredients.Select(p => new IngredientDTO
                    {
                        name = p.Ingredient.Name,
                        id = p.IngredientId,
                        amount = p.Amount,
                        image = p.Ingredient.Image == null ? "" :
                        "data:image/png;base64," + Convert.ToBase64String(p.Ingredient.Image)
                    }
                )));

            CreateMap<RecipeDTO, Recipe>()
                .ForMember(dest => dest.Image, opt => {
                    opt.PreCondition(s => !string.IsNullOrEmpty(s.image));
                    opt.MapFrom(src => Convert.FromBase64String(src.image!));
                })
                .ForMember(dest => dest.Ingredients, opt => opt.MapFrom(src =>
                    src.ingredients.Select(p => new IngredientAmount
                    {
                        IngredientId = p.id,
                        Amount = p.amount
                    })
                //foreach (var ingredient in src.ingredients)
                //{
                //    dest.Ingredients.Add(new IngredientAmount()
                //    {
                //        Name = ingredient.name,
                //        Id = ingredient.id,
                //        Image = string.IsNullOrEmpty(ingredient.image) ? null : Convert.FromBase64String(ingredient.image)
                //    });
                //}
                //return dest.ingredients;
                ));

            CreateMap<Ingredient, IngredientDTO>()
                .ForMember(dest => dest.image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image!)));

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
