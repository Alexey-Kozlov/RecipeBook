import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeBook';
  loadedFeature: string = "feature";

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
