import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }

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
}
