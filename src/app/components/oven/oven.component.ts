import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IDough } from 'src/app/classes/dough.interface';
import { Datastore } from 'src/app/classes/enums';
import { RestService } from 'src/app/core/rest.service';
import { NameComponent } from '../name/name.component';

@Component({
  selector: 'app-oven',
  templateUrl: './oven.component.html',
  styleUrls: ['./oven.component.sass'],
  providers: [MessageService]
})
export class OvenComponent implements OnInit {
  dough: IDough;
  step: number;
  @ViewChild(NameComponent) nameComp: NameComponent;

  constructor(private restSvc: RestService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.step = 0;
    if(typeof this.dough === 'undefined'){
      this.dough = { name: "", options: Datastore.None };
    }
  }

  setName($event) {
    const name = $event.replace(/ /g, '-');
    if(typeof this.dough === 'undefined') {
      this.dough = { name: name, options: Datastore.None };
    } else {
      this.dough.name = name;
    }
    this.nextStep();
  }

  addIngredients($event) {
    this.dough.options = $event;
    this.nextStep();
  }

  prevStep() {
    this.step--;
    console.log(`previous step: ${this.step}`);
  }

  nextStep() {
    this.step++;
    console.log(`next step: ${this.step}`);
  }

  resetProject() {
    this.step = 1;
    this.dough = { name: "", options: Datastore.None };
  }
}
