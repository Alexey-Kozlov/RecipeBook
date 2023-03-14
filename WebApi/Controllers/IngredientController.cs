using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class IngredientController : ControllerBase
    {
        private readonly IngredientService _ingredientService;
        private readonly IMapper _mapper;
        public IngredientController(IngredientService ingredientService, IMapper mapper)
        {
            _ingredientService = ingredientService;
            _mapper = mapper;
        }

        [HttpGet("GetIngredients")]
        public async Task<List<IngredientDTO>> GetIngredient()
        {
            return _mapper.Map<List<IngredientDTO>>(await _ingredientService.GetIngredients());
        }

        [HttpPost("CreateIngredient")]
        public async Task<IngredientDTO> CreateIngredient([FromBody]IngredientDTO ingredient)
        {
            return _mapper.Map<IngredientDTO>(await _ingredientService.CreateIngredient(ingredient));
        }
    }
}
