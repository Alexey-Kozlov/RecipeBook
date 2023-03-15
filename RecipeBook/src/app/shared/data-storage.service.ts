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

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.post(process.env.NG_APP_API + '/CreateUpdateRecipe', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  loadRecipes() {
    this.http.get<Recipe[]>(process.env.NG_APP_API + '/GetRecipes').subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
  }

  saveIngredient(ingredient: Ingredient) {
    this.http.post(process.env.NG_APP_API + '/CreateUpdateIngredient', ingredient)
      .subscribe(response => {
        console.log(response);
      });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.http.post(process.env.NG_APP_API + '/DeleteIngredient', ingredient.id)
      .subscribe(response => {
        console.log(response);
      });
  }

  loadIngredients() {
    this.http.get<Ingredient[]>(process.env.NG_APP_API + '/GetIngredients').subscribe(ingredients => {
      this.ingredientService.setIngredients(ingredients);
    });
  }
}
