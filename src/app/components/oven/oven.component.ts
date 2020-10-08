import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
