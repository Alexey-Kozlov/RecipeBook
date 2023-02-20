import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testb',
  templateUrl: './testb.component.html',
  styleUrls: ['./testb.component.css']
})
export class TestbComponent {
  @Input() data: string = "";
}
