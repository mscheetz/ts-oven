import { writeFile } from 'fs';
import { argv } from 'yargs';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
   
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   ADDRESS: "${process.env.ADDRESS}",
   LOGIN: "${process.env.LOGIN}",
   BAKE: "${process.env.BAKE}",
   COOKIE: "${process.env.COOKIE}",
   VERSIONS: "${process.env.VERSIONS}",
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Environment file created: ${targetPath}`);
});