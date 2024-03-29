using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService _recipeService;
        private readonly IMapper _mapper;
        public RecipesController(RecipeService recipeService, IMapper mapper)
        {
            _recipeService = recipeService;
            _mapper = mapper;
        }

        [HttpGet("GetRecipes")]
        public async Task<List<RecipeDTO>> GetRecipes() 
        { 
            return await _recipeService.GetRecipeDTOList();
        }

        [HttpGet("GetRecipe")]
        public async Task<RecipeDTO> GetRecipeById(int id)
        {
            return await _recipeService.GetRecipeDTOById(id);
        }

        [HttpPost("CreateUpdateRecipe")]
        public async Task<RecipeDTO> CreateUpdateRecipe(RecipeDTO recipe)
        {
            return _mapper.Map<RecipeDTO>(await _recipeService.CreateUpdateRecipe(recipe));
        }

        [HttpPost("DeleteRecipe")]
        public async Task<bool> DeleteRecipe([FromBody] int id)
        {
            return await _recipeService.DeleteRecipe(id);
        }

        [HttpPost("DeleteRecipeIngredient")]
        public async Task<bool> DeleteRecipeIngredient([FromBody] int id)
        {
            return await _recipeService.DeleteRecipeIngredient(id);
        }

    }
}