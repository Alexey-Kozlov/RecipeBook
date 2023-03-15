import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: 'root' })
export class IngredientService {

  constructor() { }

  private ingredients: Ingredient[] = [];

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients.find(p => p.id === id);
  }
  addIngredient(ingridient: Ingredient) {
    this.ingredients.push(ingridient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  createUpdateIngredient(id: number, ingredient: Ingredient) {
    if (id === 0) {
      this.addIngredient(ingredient);
    } else {
      let editIngredient = this.getIngredient(id);
      editIngredient!.name = ingredient.name;
      if (ingredient.image) {
        editIngredient!.image = ingredient.image;
      }
      const index = this.ingredients.indexOf(this.ingredients.find(p => p.id === id)!);
      this.ingredients[index] = editIngredient!;
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    const index = this.ingredients.indexOf(this.ingredients.find(p => p.id === id)!);
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredients.forEach(p => {
      p.image = 'data:image/png;base64,' + p.image;
    });
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
