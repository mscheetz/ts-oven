/**
 * Copyright (c) 2020
 * 
 * Entry point for NodeJS/Typecript application
 * 
 * @summary Index
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import routes from "./routes";
import LogService from "./services/log.service";
import { LogLevel } from "./interfaces/enums";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
console.log(`Port: ${process.env.PORT}`);
const distDir = `dist/ts-oven`;

const forceSSL = function() {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

if(process.env.ENVIRONMENT !== `DEV`){
    app.use(forceSSL());
}

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", routes);

app.get(`/`, function(req: express.Request, res: express.Response) {
  LogService.writeLog(LogLevel.INFO, `new request from ${req.ip}`);
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  var opt = {
    foo: "bar",
    bar: "foo"
  };
  LogService.writeLog(LogLevel.INFO, `data:`, opt);
  LogService.writeLog(LogLevel.INFO, `Server started on port ${port}!`);
});