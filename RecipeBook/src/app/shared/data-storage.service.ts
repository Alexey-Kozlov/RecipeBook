import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IngredientService } from "../ingredients/ingredient.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { Ingredient } from "./ingredient.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private ingredientService: IngredientService) { }

  saveRecipe(recipe: Recipe) {
    this.http.post<Recipe>(process.env.NG_APP_API + '/CreateUpdateRecipe', recipe)
      .subscribe(recipe => {
        this.recipeService.recipe.next(recipe);
      });
  }

  loadRecipes() {
    this.http.get<Recipe[]>(process.env.NG_APP_API + '/GetRecipes').subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
  }

  loadRecipe(id: number) {
    this.http.get<Recipe>(process.env.NG_APP_API + '/GetRecipe',
      {
        params: {
          id:id
        }
      }
    ).subscribe(recipe => {
      this.recipeService.setRecipe(recipe);
    });
  }

  saveIngredient(ingredient: Ingredient) {
    this.http.post(process.env.NG_APP_API + '/CreateUpdateIngredient', ingredient)
      .subscribe(response => {

      });
  }

  deleteIngredient(id: number) {
    this.http.post(process.env.NG_APP_API + '/DeleteIngredient', id)
      .subscribe(response => {

      });
  }

  loadIngredients() {
    this.http.get<Ingredient[]>(process.env.NG_APP_API + '/GetIngredients').subscribe(ingredients => {
      this.ingredientService.setIngredients(ingredients);
    });
  }
}
