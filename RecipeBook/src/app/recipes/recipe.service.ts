import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {

  recipeChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Окрошка',
      'Вкусная окрошка',
      'https://my-eda.ru/wp-content/uploads/2019/04/s1200-1.jpg',
      [
        new Ingredient(1,'Квас', 200),
        new Ingredient(2,'Колбаса', 2),
        new Ingredient(3,'Лук', 15),
        new Ingredient(4,'Яйцо', 1),
        new Ingredient(5,'Огурцы', 20)
      ]),
    new Recipe(
      'Блины',
      'Классические русские блины',
      'https://dachadecor.ru/images2/kjdnvjntdkj.jpg',
      [
        new Ingredient(1,'Молоко', 500),
        new Ingredient(2,'Яйца', 5),
        new Ingredient(3,'Мука', 15)
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }
}
