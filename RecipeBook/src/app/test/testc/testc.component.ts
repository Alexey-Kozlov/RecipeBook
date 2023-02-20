import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testc',
  templateUrl: './testc.component.html',
  styleUrls: ['./testc.component.css']
})
export class TestcComponent {
  @Input() data: string = "";
}
