import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private idChangeSubscription: Subscription | undefined;

  constructor(private ingService: IngredientService) { }

  ngOnInit() {
    const ingredientArray = this.ingService.getIngredients();
    ingredientArray.forEach(p => {
      p.image = 'data:image/png;base64,' + p.image;
    });
    this.ingredients = ingredientArray;

    this.idChangeSubscription = this.ingService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        ingredients.forEach(p => {
          if (p.image?.indexOf('data:image/png;base64') === -1) {
            p.image = 'data:image/png;base64,' + p.image;
          }
        });
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.idChangeSubscription?.unsubscribe();
  }

  onEditItem(id: number) {
    this.ingService.startedEditing.next(id);
  }

}
