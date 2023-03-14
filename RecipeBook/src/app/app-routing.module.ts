import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IngredientEditComponent } from "./ingredients/ingredient-edit/ingredient-edit.component";
import { IngredientListComponent } from "./ingredients/ingredient-list/ingredient-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'ingredient-list', component: IngredientListComponent, children: [
      { path: 'new', component: IngredientEditComponent },
      { path: ':id', component: IngredientEditComponent }
  ]},
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
  })
export class AppRoutingModule{

}
