import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IDough } from 'src/app/classes/dough.interface';
import { Ingredient, License } from 'src/app/classes/enums';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-bake',
  templateUrl: './bake.component.html',
  styleUrls: ['./bake.component.sass', '../oven/oven.component.sass']
})
export class BakeComponent implements OnInit {
  @Input() dough: IDough;
  @Output() previousStepEvent = new EventEmitter<any>();
  baked: boolean = false;
  showReset: boolean = false;
  showLicense: boolean = false;
  credsRequired: boolean = false;
  @Output() resetEvent = new EventEmitter<any>();

  constructor(private restSvc: RestService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.showLicense = false;
  }

  checkOptions() {
    if((this.dough.options & Ingredient.RABBITMQ) === Ingredient.RABBITMQ) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.KAFKA) === Ingredient.KAFKA) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.MONGO) === Ingredient.MONGO) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.MYSQL) === Ingredient.MYSQL) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.NEO4J) === Ingredient.NEO4J) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.OAUTH) === Ingredient.OAUTH) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.PG) === Ingredient.PG) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.REDIS) === Ingredient.REDIS) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.S3) === Ingredient.S3) {
      this.credsRequired = true;
    } else if((this.dough.options & Ingredient.SQLSERVER) === Ingredient.SQLSERVER) {
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
      if(this.dough.license === License.ISC || this.dough.license === License.MIT) {
        this.showLicense = true;
      }
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
