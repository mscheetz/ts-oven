import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../classes/enums';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass', '../oven/oven.component.sass']
})
export class IngredientsComponent implements OnInit {
  RABBITMQ: boolean = false;
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
  DOCKER: boolean = false;
  SWAGGER: boolean = false;
  IPFS: boolean = false;
  showAuth: boolean = false;
  showData: boolean = false;
  showMessage: boolean = false;
  showStorage: boolean = false;
  showBlockchain: boolean = false;
  showOther: boolean = false;
  enableVersions: boolean = false;
  ingredients: Ingredient;
  @Input() options: Ingredient;
  @Output() ingredientsEvent = new EventEmitter<Ingredient>();
  @Output() previousStepEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if((this.options & Ingredient.RABBITMQ) === Ingredient.RABBITMQ) {
      this.RABBITMQ = true;
    }
    if((this.options & Ingredient.BTC) === Ingredient.BTC) {
      this.BTC = true;
    }
    if((this.options & Ingredient.ETH) === Ingredient.ETH) {
      this.ETH = true;
    }
    if((this.options & Ingredient.GRAPHQL) === Ingredient.GRAPHQL) {
      this.GRAPHQL = true;
    }
    if((this.options & Ingredient.KAFKA) === Ingredient.KAFKA) {
      this.KAFKA = true;
    }
    if((this.options & Ingredient.MONGO) === Ingredient.MONGO) {
      this.MONGO = true;
    }
    if((this.options & Ingredient.MYSQL) === Ingredient.MYSQL) {
      this.MYSQL = true;
    }
    if((this.options & Ingredient.NEO4J) === Ingredient.NEO4J) {
      this.NEO4J = true;
    }
    if((this.options & Ingredient.OAUTH) === Ingredient.OAUTH) {
      this.OAUTH = true;
    }
    if((this.options & Ingredient.PG) === Ingredient.PG) {
      this.PG = true;
    }
    if((this.options & Ingredient.REDIS) === Ingredient.REDIS) {
      this.REDIS = true;
    }
    if((this.options & Ingredient.S3) === Ingredient.S3) {
      this.S3 = true;
    }
    if((this.options & Ingredient.SQLSERVER) === Ingredient.SQLSERVER) {
      this.SQLSERVER = true;
    }
    if((this.options & Ingredient.WEBAUTH) === Ingredient.WEBAUTH) {
      this.WEBAUTH = true;
    }
    if((this.options & Ingredient.LOGGING) === Ingredient.LOGGING) {
      this.LOGGING = true;
    }
    if((this.options & Ingredient.DOCKER) === Ingredient.DOCKER) {
      this.DOCKER = true;
    }
    if((this.options & Ingredient.SWAGGER) === Ingredient.SWAGGER) {
      this.SWAGGER = true;
    }
    if((this.options & Ingredient.IPFS) === Ingredient.IPFS) {
      this.IPFS = true;
    }
  }

  toggleOptions(section: string) {
    if (section === "Auth") {
      this.showAuth = !this.showAuth;
    } else if (section === "Data") {
      this.showData = !this.showData;
    } else if (section === "Message") {
      this.showMessage = !this.showMessage;
    } else if (section === "Storage") {
      this.showStorage = !this.showStorage;
    } else if (section === "Blockchain") {
      this.showBlockchain = !this.showBlockchain;
    } else if (section === "Other") {
      this.showOther = !this.showOther;
    } 
  }

  editVersions(option: number) {
    const ingredient: Ingredient = option;
    console.log(`getting versions for ${ingredient}`);
  }

  nextStep() {    
    if(this.RABBITMQ) {
      this.ingredients = this.ingredients | Ingredient.RABBITMQ;
    }
    if(this.BTC) {
      this.ingredients = this.ingredients | Ingredient.BTC;
    }
    if(this.ETH) {
      this.ingredients = this.ingredients | Ingredient.ETH;
    }
    if(this.GRAPHQL) {
      this.ingredients = this.ingredients | Ingredient.GRAPHQL;
    }
    if(this.KAFKA) {
      this.ingredients = this.ingredients | Ingredient.KAFKA;
    }
    if(this.LOGGING) {
      this.ingredients = this.ingredients | Ingredient.LOGGING;
    }
    if(this.MONGO) {
      this.ingredients = this.ingredients | Ingredient.MONGO;
    }
    if(this.MYSQL) {
      this.ingredients = this.ingredients | Ingredient.MYSQL;
    }
    if(this.NEO4J) {
      this.ingredients = this.ingredients | Ingredient.NEO4J;
    }
    if(this.OAUTH) {
      this.ingredients = this.ingredients | Ingredient.OAUTH;
    }
    if(this.PG) {
      this.ingredients = this.ingredients | Ingredient.PG;
    }
    if(this.REDIS) {
      this.ingredients = this.ingredients | Ingredient.REDIS;
    }
    if(this.S3) {
      this.ingredients = this.ingredients | Ingredient.S3;
    }
    if(this.SQLSERVER) {
      this.ingredients = this.ingredients | Ingredient.SQLSERVER;
    }
    if(this.WEBAUTH) {
      this.ingredients = this.ingredients | Ingredient.WEBAUTH;
    }
    if(this.DOCKER) {
      this.ingredients = this.ingredients | Ingredient.DOCKER;
    }
    if(this.SWAGGER) {
      this.ingredients = this.ingredients | Ingredient.SWAGGER;
    }
    if(this.IPFS) {
      this.ingredients = this.ingredients | Ingredient.IPFS;
    }
    if(typeof this.ingredients === 'undefined') {
      this.ingredients = Ingredient.None;
    }
    this.ingredientsEvent.emit(this.ingredients);
  }

  previousStep() {
    this.previousStepEvent.emit(true);
  }
}
