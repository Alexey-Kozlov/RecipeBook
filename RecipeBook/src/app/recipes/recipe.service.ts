import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {

  recipeChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  recipe = new Subject<Recipe>();

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }

  setRecipe(recipe: Recipe) {
    this.recipe.next(recipe);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    let recipe = this.recipes.find(p => p.id === id);
    recipe = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const index = this.recipes.indexOf(this.recipes.find(p => p.id === id)!);
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }
}
