import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
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
  id: number = 0;

  constructor(private ingService: IngredientService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.loadIngredients();
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
    this.id = id;
    this.ingService.startedEditing.next(id);
  }

}
