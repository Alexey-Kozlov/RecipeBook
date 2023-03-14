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
    this.ingredients = this.ingService.getIngredients();
    this.idChangeSubscription = this.ingService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.idChangeSubscription?.unsubscribe();
  }

  onEditItem(index: number) {
    this.ingService.startedEditing.next(index);
  }

}
