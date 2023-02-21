import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Окрошка',
      'Вкусная окрошка',
      'https://my-eda.ru/wp-content/uploads/2019/04/s1200-1.jpg',
      [
        new Ingredient('Квас', 200),
        new Ingredient('Колбаса', 2),
        new Ingredient('Лук', 15),
        new Ingredient('Яйцо', 1),
        new Ingredient('Огурцы', 20)
      ]),
    new Recipe(
      'Блины',
      'Классические русские блины',
      'https://dachadecor.ru/images2/kjdnvjntdkj.jpg',
      [
        new Ingredient('Молоко', 500),
        new Ingredient('Яйца', 5),
        new Ingredient('Мука', 15)
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }
}
