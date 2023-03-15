using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain;
using WebApi.Models;
using WebApi.Persistance;

namespace WebApi.Services
{
    public class IngredientService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public IngredientService(IMapper mapper, DataContext dataContext)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }

        public async Task<List<Ingredient>> GetIngredients()
        {            
            return await _dataContext.Ingredient.ToListAsync();
        }

        public async Task<Ingredient> CreateUpdateIngredient(IngredientDTO ingredient)
        {
            var _ingredient = _mapper.Map<Ingredient>(ingredient);
            if (ingredient.id == 0)
            {
                _dataContext.Ingredient.Add(_ingredient);
            }
            await _dataContext.SaveChangesAsync();
            return _ingredient;
        }

        public async Task<bool> DeleteIngredient(int ingredientId)
        {
            var ingredient = await _dataContext.Ingredient.FirstOrDefaultAsync(p => p.Id == ingredientId);
            if(ingredient != null)
            {
                _dataContext.Ingredient.Remove(ingredient);
                await _dataContext.SaveChangesAsync();
                return true;
            })
            return false;
        }
    }
}
