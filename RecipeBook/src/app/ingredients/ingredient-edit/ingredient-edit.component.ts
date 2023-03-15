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
  editedItemId: number = 0;
  editedItem!: Ingredient;
  updatedItem: Ingredient = new Ingredient(0, '', 0, '');
  editImageSrc: string = '';

  constructor(private ingService: IngredientService) { }

  async fileChanged(e: Event) {
    const fileToUpload: File | null = (<HTMLInputElement>e.target).files![0];
    fileToUpload.arrayBuffer().then(p => {
      this.updatedItem.amount = p.byteLength;
      this.updatedItem.image = btoa(new Uint8Array(p.slice(0)).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      this.editImageSrc = 'data:image/png;base64,' + this.updatedItem.image;
    })
  }

  onSubmit(form: NgForm) {
    this.updatedItem.name = form.value.name;
    this.ingService.createUpdateIngredient(this.editedItemId, this.updatedItem);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editImageSrc = '';
    this.editMode = false;
  }

  onDelete() {
    this.ingService.deleteIngredient(this.editedItemId);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.ingService.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemId= id;
      this.editedItem = this.ingService.getIngredient(id)!;
      this.editImageSrc = this.editedItem.image!;
      this.slForm.setValue({
        name: this.editedItem.name,
        image: ''
      });
    });
  }

}
