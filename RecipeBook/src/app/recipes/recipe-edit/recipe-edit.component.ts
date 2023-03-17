import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientService } from '../../ingredients/ingredient.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private ingredientService: IngredientService,
    private router: Router  ) { }

  id: number = 0;
  editMode = false;
  recipeForm!: FormGroup;
  ingList!: Ingredient[];
  recipe!: Recipe;
  recipeSubscription = new Subscription();
  ingredientSubscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.dataStorageService.loadRecipe(this.id);
        }
      }
    );
    this.recipeSubscription = this.recipeService.recipe.subscribe(
      (recipe: Recipe) => {
        recipe.image = 'data:image/png;base64,' + recipe.image;
        this.recipe = recipe;
        this.initForm();
      }
    );
    this.ingredientSubscription = this.ingredientService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingList = ingredients;
      }
    )
    this.dataStorageService.loadIngredients();
    if (!this.editMode) {
      this.initForm();
    }
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
    this.ingredientSubscription.unsubscribe();
  }

  onSubmit() {
    let ingredients: Ingredient[] = [];
    this.recipeForm.value.ingredients.forEach((p: any) => {
      ingredients.push(new Ingredient(p.id ? p.id : 0, p.ingredientId, p.name, p.amount))
    });

    const newResipe = new Recipe(
      this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.image,
      ingredients
    )
    this.dataStorageService.saveRecipe(newResipe);
    this.onCancel();
  }

  private initForm() {
    let recipeId = 0;
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<any>([]);


    if (this.editMode) {
      recipeId = this.recipe!.id;
      recipeName = this.recipe!.name;
      recipeImage = this.recipe!.image;
      recipeDescription = this.recipe!.description;
      if (this.recipe!['ingredients']) {
        for (let ingredient of this.recipe!.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredient.id),
              'ingredientId': new FormControl(ingredient.ingredientId),
              'image': new FormControl(ingredient.image),
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'image': new FormControl(recipeImage),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredientId': new FormControl(null),
        'image': new FormControl(null),
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    const id = (<FormArray>this.recipeForm.get('ingredients')).controls[index].value.id;
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.dataStorageService.deleteRecipeIngredient(id);
  }

  selectedIngr(e: Event, index: number) {
    //возвращает по наименованию, не по id - поэтому получаем по наименованию ингредиента
    const changedIngredientText: string = (<HTMLSelectElement>e.target).value;
    const changedIngredient: Ingredient = this.ingList.find(p => p.name == changedIngredientText)!;
    //this.recipeForm.value.ingredients[index].image = changedIngredient.image; //так тоже можно
    (<FormArray>this.recipeForm.get('ingredients')).controls[index].patchValue({ image: changedIngredient.image });
    (<FormArray>this.recipeForm.get('ingredients')).controls[index].patchValue({ ingredientId: changedIngredient.id });
  }

  async fileChanged(e: Event) {
    const fileToUpload: File | null = (<HTMLInputElement>e.target).files![0];
    fileToUpload.arrayBuffer().then(p => {
      (<FormGroup>this.recipeForm).patchValue({
        image: 'data:image/png;base64,' +
          btoa(new Uint8Array(p.slice(0)).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      });
    })
  }

}
