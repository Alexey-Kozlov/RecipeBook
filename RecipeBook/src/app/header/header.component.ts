import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }

  onLoadData() {
    this.dataStorageService.loadRecipes();
  }
}
