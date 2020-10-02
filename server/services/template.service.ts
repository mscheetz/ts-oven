class TemplateService {

    public packageJson = (): string => {
        const contents = `{
    "name": "{ProjectName}",
    "version": "1.0.0",
    "description": "{ProjectDescription}",
    "main": "index.js",
    "scripts": {
        "dev": "ts-node ./src/index.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "@types/archiver": "^3.1.0",
        "@types/bcryptjs": "^2.4.2",
        "@types/body-parser": "^1.19.0",
        "@types/compression": "^1.7.0",
        "@types/cors": "^2.8.7",
        "@types/express": "^4.17.8",
        "@types/helmet": "0.0.48",
        "@types/jsonwebtoken": "^8.5.0",
        "@types/node": "^14.6.4",
        "archiver": "^5.0.2",
        "bcryptjs": "^2.4.3",
        "body-parser": "^1.19.0",
        "compression": "^1.7.4",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "helmet": "^4.1.0",
        "jsonwebtoken": "^8.5.1",
        "ts-node": "^9.0.0",
        "typescript": "^4.0.2",
        "uuid": "^8.3.0"
    }
}
          `;

        return contents;
    }

    public indexTS = (): string => {
        const contents = `import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import routes from "./routes";

const app = express();

dotenv.config();
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(3000, () => {
    console.log("Server started on port 3000!");
});
        `;

        return contents;
    }
}

export default TemplateService;