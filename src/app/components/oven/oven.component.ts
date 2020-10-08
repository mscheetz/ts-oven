import { Component, OnInit } from '@angular/core';
import { IDough } from 'src/app/classes/dough.interface';
import { Datastore } from 'src/app/classes/enums';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-oven',
  templateUrl: './oven.component.html',
  styleUrls: ['./oven.component.sass']
})
export class OvenComponent implements OnInit {
  appName: string = "";
  AMQ: boolean = false;
  ETH: boolean = false;
  GRAPHQL: boolean = false;
  KAFKA: boolean = false;
  MONGO: boolean = false;
  MYSQL: boolean = false;
  NEO4J: boolean = false;
  PG: boolean = false;
  REDIS: boolean = false;
  S3: boolean = false;
  SQLSERVER: boolean = false;
  WEBAUTH: boolean = false;
  LOGGING: boolean = false;
  inTheOven: boolean = false;

  constructor(private restSvc: RestService) { }

  ngOnInit(): void {
  }

  onBake() {
    const dough = this.mixDough();

    this.restSvc.bake(dough)
    .subscribe(res => {
      console.log('hi');
      
      var a = document.createElement("a");
      //a.href = URL.createObjectURL(res.blob());
      a.href = URL.createObjectURL(res);
      a.download = `${dough.name}.zip`;
      // start download
      a.click();
    }, err => {
      console.log(err);
    })
  }

  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/zip' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  mixDough(): IDough {
    var dough: IDough = { name: this.appName.replace(/ /g, '-'), options: Datastore.None };
    
    if(this.AMQ) {
      dough.options = dough.options | Datastore.AMQ;
    }
    if(this.ETH) {
      dough.options = dough.options | Datastore.ETH;
    }
    if(this.GRAPHQL) {
      dough.options = dough.options | Datastore.GRAPHQL;
    }
    if(this.KAFKA) {
      dough.options = dough.options | Datastore.KAFKA;
    }
    if(this.LOGGING) {
      dough.options = dough.options | Datastore.LOGGING;
    }
    if(this.MONGO) {
      dough.options = dough.options | Datastore.MONGO;
    }
    if(this.MYSQL) {
      dough.options = dough.options | Datastore.MYSQL;
    }
    if(this.NEO4J) {
      dough.options = dough.options | Datastore.NEO4J;
    }
    if(this.PG) {
      dough.options = dough.options | Datastore.PG;
    }
    if(this.REDIS) {
      dough.options = dough.options | Datastore.REDIS;
    }
    if(this.S3) {
      dough.options = dough.options | Datastore.S3;
    }
    if(this.SQLSERVER) {
      dough.options = dough.options | Datastore.SQLSERVER;
    }
    if(this.WEBAUTH) {
      dough.options = dough.options | Datastore.WEBAUTH;
    }

    return dough;
  }
}
