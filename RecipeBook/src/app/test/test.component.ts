import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  ar1: number[] = [];
  ar2: number[] = [];
  data_b: string = "";
  data_c: string = "";

  tm_event(data:number) {
    if (data % 2 === 0) {
      this.ar1.push(data);
      this.data_b += data + ", ";
    } else {
      this.ar2.push(data);
      this.data_c += data + ", ";
    }
  }
}
