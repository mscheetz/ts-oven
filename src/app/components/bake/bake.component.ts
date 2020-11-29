import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Datastore } from 'src/app/classes/enums';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-bake',
  templateUrl: './bake.component.html',
  styleUrls: ['./bake.component.sass', '../oven/oven.component.sass']
})
export class BakeComponent implements OnInit {
  @Input() dough;
  @Output() previousStepEvent = new EventEmitter<any>();
  baked: boolean = false;
  showReset: boolean = false;
  credsRequired: boolean = false;
  @Output() resetEvent = new EventEmitter<any>();

  constructor(private restSvc: RestService, private msgSvc: MessageService) { }

  ngOnInit(): void {
  }

  checkOptions() {
    if((this.dough.options & Datastore.AMQ) === Datastore.AMQ) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.KAFKA) === Datastore.KAFKA) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.MONGO) === Datastore.MONGO) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.MYSQL) === Datastore.MYSQL) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.NEO4J) === Datastore.NEO4J) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.OAUTH) === Datastore.OAUTH) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.PG) === Datastore.PG) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.REDIS) === Datastore.REDIS) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.S3) === Datastore.S3) {
      this.credsRequired = true;
    } else if((this.dough.options & Datastore.SQLSERVER) === Datastore.SQLSERVER) {
      this.credsRequired = true;
    }
  }

  onBake() {
    this.baked = false;
    this.checkOptions();

    this.restSvc.bake(this.dough)
    .subscribe(res => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = `${this.dough.name}.zip`;
      
      a.click();
      
      this.baked = true;
      this.showReset = true;
    }, err => {
      console.log(err);
    })
  }

  previousStep() {
    this.previousStepEvent.emit(true);
  }

  onReset() {
    this.resetEvent.emit(true);
  }
}
