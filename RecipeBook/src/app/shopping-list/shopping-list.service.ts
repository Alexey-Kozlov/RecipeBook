import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Яблоки', 5),
    new Ingredient('Помидоры', 10)
  ];

  ingredientChanged = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingridient: Ingredient) {
    this.ingredients.push(ingridient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
