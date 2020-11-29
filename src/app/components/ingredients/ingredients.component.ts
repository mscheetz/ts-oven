import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Datastore } from 'server/interfaces/enums';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass', '../oven/oven.component.sass']
})
export class IngredientsComponent implements OnInit {
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
  DOCKER: boolean = false;
  ingredients: Datastore;
  @Input() options: Datastore;
  @Output() ingredientsEvent = new EventEmitter<Datastore>();
  @Output() previousStepEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if((this.options & Datastore.AMQ) === Datastore.AMQ) {
      this.AMQ = true;
    }
    if((this.options & Datastore.BTC) === Datastore.BTC) {
      this.BTC = true;
    }
    if((this.options & Datastore.ETH) === Datastore.ETH) {
      this.ETH = true;
    }
    if((this.options & Datastore.GRAPHQL) === Datastore.GRAPHQL) {
      this.GRAPHQL = true;
    }
    if((this.options & Datastore.KAFKA) === Datastore.KAFKA) {
      this.KAFKA = true;
    }
    if((this.options & Datastore.MONGO) === Datastore.MONGO) {
      this.MONGO = true;
    }
    if((this.options & Datastore.MYSQL) === Datastore.MYSQL) {
      this.MYSQL = true;
    }
    if((this.options & Datastore.NEO4J) === Datastore.NEO4J) {
      this.NEO4J = true;
    }
    if((this.options & Datastore.OAUTH) === Datastore.OAUTH) {
      this.OAUTH = true;
    }
    if((this.options & Datastore.PG) === Datastore.PG) {
      this.PG = true;
    }
    if((this.options & Datastore.REDIS) === Datastore.REDIS) {
      this.REDIS = true;
    }
    if((this.options & Datastore.S3) === Datastore.S3) {
      this.S3 = true;
    }
    if((this.options & Datastore.SQLSERVER) === Datastore.SQLSERVER) {
      this.SQLSERVER = true;
    }
    if((this.options & Datastore.WEBAUTH) === Datastore.WEBAUTH) {
      this.WEBAUTH = true;
    }
    if((this.options & Datastore.LOGGING) === Datastore.LOGGING) {
      this.LOGGING = true;
    }
    if((this.options & Datastore.DOCKER) === Datastore.DOCKER) {
      this.DOCKER = true;
    }
  }

  nextStep() {    
    if(this.AMQ) {
      this.ingredients = this.ingredients | Datastore.AMQ;
    }
    if(this.BTC) {
      this.ingredients = this.ingredients | Datastore.BTC;
    }
    if(this.ETH) {
      this.ingredients = this.ingredients | Datastore.ETH;
    }
    if(this.GRAPHQL) {
      this.ingredients = this.ingredients | Datastore.GRAPHQL;
    }
    if(this.KAFKA) {
      this.ingredients = this.ingredients | Datastore.KAFKA;
    }
    if(this.LOGGING) {
      this.ingredients = this.ingredients | Datastore.LOGGING;
    }
    if(this.MONGO) {
      this.ingredients = this.ingredients | Datastore.MONGO;
    }
    if(this.MYSQL) {
      this.ingredients = this.ingredients | Datastore.MYSQL;
    }
    if(this.NEO4J) {
      this.ingredients = this.ingredients | Datastore.NEO4J;
    }
    if(this.OAUTH) {
      this.ingredients = this.ingredients | Datastore.OAUTH;
    }
    if(this.PG) {
      this.ingredients = this.ingredients | Datastore.PG;
    }
    if(this.REDIS) {
      this.ingredients = this.ingredients | Datastore.REDIS;
    }
    if(this.S3) {
      this.ingredients = this.ingredients | Datastore.S3;
    }
    if(this.SQLSERVER) {
      this.ingredients = this.ingredients | Datastore.SQLSERVER;
    }
    if(this.WEBAUTH) {
      this.ingredients = this.ingredients | Datastore.WEBAUTH;
    }
    if(this.DOCKER) {
      this.ingredients = this.ingredients | Datastore.DOCKER;
    }
    if(typeof this.ingredients === 'undefined') {
      this.ingredients = Datastore.None;
    }
    this.ingredientsEvent.emit(this.ingredients);
  }

  previousStep() {
    this.previousStepEvent.emit(true);
  }
}
