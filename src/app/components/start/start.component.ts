import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass', '../oven/oven.component.sass']
})
export class StartComponent implements OnInit {
  @Output() startEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  nextStep() {
    this.startEvent.emit(true);
  }
}
