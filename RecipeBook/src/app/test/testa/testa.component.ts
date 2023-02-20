import { Component, EventEmitter, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-testa',
  templateUrl: './testa.component.html',
  styleUrls: ['./testa.component.css']
})
export class TestaComponent {
  interval_obj: any;
  cnt: number = 0;
  @Output() cnt_event = new EventEmitter<number>();
  ButStart() {
    this.interval_obj = setInterval(() => {
      this.cnt_event.emit(this.cnt + 1);
      this.cnt++;
    }, 1000);
  }
  ButPause() {
    clearInterval(this.interval_obj);
  }
}
