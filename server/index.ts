import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import routes from "./routes";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
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
    console.log(`new request from ${req.ip}`);
    
    res.status(200).sendFile(`/`, { root: distDir });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});