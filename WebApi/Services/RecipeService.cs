using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain;
using WebApi.Models;
using WebApi.Persistance;
using WebApi.Extentions;

namespace WebApi.Services
{
    public class RecipeService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;
        public RecipeService(DataContext dataContext, IMapper mapper) 
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<List<RecipeDTO>> GetRecipeDTOList()
        {
            var mapp = new Mapper(new MapperConfiguration(cfg => { cfg.AddProfile(new Mapping2()); }));
            var recipes = await _dataContext.Recipe
                .ProjectTo<RecipeDTO>( mapp.ConfigurationProvider)
                .ToListAsync();
            return recipes;
        }

        public async Task<RecipeDTO> GetRecipeDTOById(int recipeId)
        {
            var recipes = await _dataContext.Recipe
                .Include(p => p.Ingredients)
                .ThenInclude(p => p.Ingredient)
                .ProjectTo<RecipeDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.id == recipeId);
            return recipes!;
        }

        public async Task<Recipe> CreateUpdateRecipe(RecipeDTO recipe)
        {
            Recipe? _recipe = new Recipe();
            if (recipe.id == 0)
            {
                //новый рецепт
                _recipe = _mapper.Map<Recipe>(recipe);
                _dataContext.Recipe.Add(_recipe);
            }
            else
            {
                //обновление рецепта
                _recipe = await _dataContext.Recipe.FirstOrDefaultAsync(p => p.Id == recipe.id);
                _mapper.Map(recipe, _recipe);
            }
            await _dataContext.SaveChangesAsync();
            //заполняем значения ингредиентов
            await _recipe!.Ingredients.ForEachAsync(async p =>
            {
                p.Ingredient = await _dataContext.Ingredient.FirstAsync(x => x.Id == p.IngredientId);
            });
            return _recipe!;
        }

    }
}
