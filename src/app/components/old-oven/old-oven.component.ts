import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IDough } from 'src/app/classes/dough.interface';
import { Ingredient } from 'src/app/classes/enums';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-old-oven',
  templateUrl: './old-oven.component.html',
  styleUrls: ['./old-oven.component.sass'],
  providers: [MessageService]
})
export class OldOvenComponent implements OnInit {
  appName: string = "";
  AMQ: boolean = false;
  BTC: boolean = false;
  ETH: boolean = false;
  GRAPHQL: boolean = false;
  KAFKA: boolean = false;
  MONGO: boolean = false;
  MYSQL: boolean = false;
  NEO4J: boolean = false;
  OAUTH: boolean = false;
  PG: boolean = false;
  REDIS: boolean = false;
  S3: boolean = false;
  SQLSERVER: boolean = false;
  WEBAUTH: boolean = false;
  LOGGING: boolean = false;
  inTheOven: boolean = false;
  showBake: boolean = true;
  showReset: boolean = false;
  projectReady: boolean = false;
  validName: boolean = true;
  DOCKER: boolean = false;

  constructor(private restSvc: RestService, private msgSvc: MessageService) { }

  ngOnInit(): void {
  }

  onBake() {
    if(this.appName === null || this.appName === "" || this.appName.match(/^ *$/) !== null) {
      this.msgSvc.add({
          severity: 'warn', 
          summary: 'Project Name Missing', 
          detail: 'Please enter a project name.'
        });
        this.appName = "";
        document.getElementById("app-name").focus();
        return;
    }
    this.showBake = false;
    const dough = this.mixDough();

    this.restSvc.bake(dough)
    .subscribe(res => {
      console.log('hi');
      
      var a = document.createElement("a");
      //a.href = URL.createObjectURL(res.blob());
      a.href = URL.createObjectURL(res);
      a.download = `${dough.name}.zip`;
      this.showReset = true;
      this.projectReady = true;
      // start download
      a.click();
    }, err => {
      console.log(err);
    })
  }

  onReset() {
    this.showReset = false;
    this.projectReady = false;
    this.appName = "";
    this.AMQ = this.BTC = this.ETH = this.GRAPHQL = this.KAFKA = this.LOGGING = this.MONGO = this.MYSQL = this.NEO4J = this.OAUTH = this.PG = this.REDIS = this.S3 = this.SQLSERVER = this.WEBAUTH = this.DOCKER = false;
    this.showBake = true;
  }
  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/zip' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  mixDough(): IDough {
    var dough: IDough = { name: this.appName.replace(/ /g, '-'), options: Ingredient.None, packages: [] };
    
    if(this.AMQ) {
      dough.options = dough.options | Ingredient.AMQ;
    }
    if(this.BTC) {
      dough.options = dough.options | Ingredient.BTC;
    }
    if(this.ETH) {
      dough.options = dough.options | Ingredient.ETH;
    }
    if(this.GRAPHQL) {
      dough.options = dough.options | Ingredient.GRAPHQL;
    }
    if(this.KAFKA) {
      dough.options = dough.options | Ingredient.KAFKA;
    }
    if(this.LOGGING) {
      dough.options = dough.options | Ingredient.LOGGING;
    }
    if(this.MONGO) {
      dough.options = dough.options | Ingredient.MONGO;
    }
    if(this.MYSQL) {
      dough.options = dough.options | Ingredient.MYSQL;
    }
    if(this.NEO4J) {
      dough.options = dough.options | Ingredient.NEO4J;
    }
    if(this.OAUTH) {
      dough.options = dough.options | Ingredient.OAUTH;
    }
    if(this.PG) {
      dough.options = dough.options | Ingredient.PG;
    }
    if(this.REDIS) {
      dough.options = dough.options | Ingredient.REDIS;
    }
    if(this.S3) {
      dough.options = dough.options | Ingredient.S3;
    }
    if(this.SQLSERVER) {
      dough.options = dough.options | Ingredient.SQLSERVER;
    }
    if(this.WEBAUTH) {
      dough.options = dough.options | Ingredient.WEBAUTH;
    }
    if(this.DOCKER) {
      dough.options = dough.options | Ingredient.DOCKER;
    }

    return dough;
  }
}
