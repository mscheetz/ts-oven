/**
 * Copyright (c) 2020
 * 
 * Entry point for NodeJS/Typecript application
 * 
 * @summary Index
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import routes from "./routes";
import { logger } from "./services/logger.service";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
logger.info(`Log level: ${process.env.LOGLEVEL}`);
logger.info(`Port: ${process.env.PORT}`);
const distDir = `./dist/ts-oven`;
const publicDir = `./dist/static`;

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

app.get('*.*', express.static(distDir, {maxAge: '1yr'}));

app.get('/', function (req, res) {
  res.status(200).sendFile(`/`, {root: distDir});
});

app.use(express.static(publicDir));

app.listen(port, () => {
  logger.info(`TS Oven server started on port ${port}!`);
});