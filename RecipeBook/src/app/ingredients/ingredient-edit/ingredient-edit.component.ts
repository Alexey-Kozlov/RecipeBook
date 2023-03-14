import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex: number = 0;
  editedItem!: Ingredient;

  constructor(private ingService: IngredientService) { }

  async fileChanged(filesList: FileList) {
    const formData: FormData = new FormData();
    const fileToUpload = filesList.item(0);
    formData.append(`image`, fileToUpload!, fileToUpload!.name);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.image);
    if (this.editMode) {
      this.ingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.ingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.ingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.ingService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.ingService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        image: this.editedItem.image
      });
    });
  }

}
