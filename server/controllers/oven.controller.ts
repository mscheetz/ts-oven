/**
 * Copyright (c) 2020
 * 
 * Oven Controller create new ts oven project
 * 
 * @summary Oven controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
/// <reference path="../interfaces/file-content.interface.ts" />
/// <reference path="../interfaces/dough.interface.ts" />
/// <reference path="../interfaces/enums.ts" />
import express from 'express';
import Archiver from 'archiver';
import path from 'path';
import CoreService from '../services/core.service';
import { logger } from '../services/logger.service';
import { Ingredient } from '../interfaces/enums';
import { IDough } from '../interfaces/dough.interface';
import NPMRepo from '../data/npm.repo';

class OvenController {
    private dir: string;
    private appName: string;
    private amq: boolean;
    private btc: boolean;
    private eth: boolean;
    private graphql: boolean;
    private kafka: boolean;
    private logging: boolean;
    private mongo: boolean;
    private mysql: boolean;
    private neo4j: boolean;
    private oauth: boolean;
    private postGres: boolean;
    private redis: boolean;
    private s3: boolean;
    private sqlServer: boolean;
    private webAuth: boolean;
    private docker: boolean;
    private swagger: boolean;
    private npmRepo: NPMRepo;

    constructor() {
        this.dir = path.join(__dirname, '../');
        this.npmRepo = new NPMRepo();
    }

    public get = async(res: express.Response) => {
        res.json(true);
    }

    public bakeTS = async(req: express.Request, res: express.Response) => {
        const body: IDough = req.body;
        const message: any = {
            body: body,
            status: 200
        };
        this.appName = body.name.replace(/ /g, '-');
        this.setOptions(body);

        let zip = Archiver('zip');
        zip.on('error', (err) => {
            res.status(500).send({error: err.message});
        });

        zip.on('end', () => {
            logger.info(`Archive wrote ${zip.pointer} bytes`);
        });

        res.attachment(`${this.appName}.zip`);

        zip.pipe(res);
        logger.info(`dir`, __dirname);
        logger.info(`dir II`, this.dir);

        const auths = await this.createAuth();

        if(auths.length > 0) {
            auths.forEach(auth => {
                zip.append(auth.content, { name: auth.path });
            });
        }

        const logs = await this.createLogging();
        
        if(logs.length > 0) {
            logs.forEach(log => {
                zip.append(log.content, { name: log.path });
            });
        }

        if(this.mongo || this.mysql || this.postGres || this.redis || this.sqlServer) {
            let content = await CoreService.readFile(this.dir + `templates/src-interfaces-base.interface.ts.txt`);
            let baseInterface: IFileContent = {
                content: content,
                path: `src/interfaces/base.interface.ts`
            };

            baseInterface = this.updateFileHeader(baseInterface);
        
            zip.append(baseInterface.content, { name: baseInterface.path});
        }

        const environment = await this.createEnvironments();
        
        const routes = await this.createRoutes();

        if(routes.length > 0) {
            routes.forEach(route => {
                zip.append(route.content, { name: route.path });
            });
        }

        const controllers = await this.createControllers();

        if(controllers.length > 0) {
            controllers.forEach(controller => {
                zip.append(controller.content, { name: controller.path });
            });
        }

        const repos = await this.createRepositories();

        if(repos.length > 0) {
            repos.forEach(repo => {
                zip.append(repo.content, { name: repo.path });
            });
        }

        if(this.docker) {
            const files = await this.dockerize();

            files.forEach(file => {
                zip.append(file.content, { name: file.path });
            });
        }

        let env = await this.createEnv();
        
        let gitignore = await this.createGitignore();

        let packageJson = await this.createPackageJson(body.name);

        let readme = await this.createReadme();

        let tsconfig = await this.createTsConfig();

        let indexTS = await CoreService.readFile(this.dir + `templates/src-index.ts.txt`);
        indexTS = this.setFileHeaderValues(indexTS);
        
        logger.info(`Creating zip file`);
        zip.append(env, { name: `.env` })
           .append(gitignore, { name: `.gitignore` })
           .append(packageJson, { name: `package.json`})
           .append(readme, { name: `readme.md` })
           .append(tsconfig, { name: `tsconfig.json` })
           .append(indexTS, { name: `src/index.ts` })
           .append(environment, { name: `src/environments/environment.ts` })
           .finalize();
    }

    private setOptions(body: IDough) {
        logger.info(`Setting options for ${body.options}`);
        this.amq = ((body.options & Ingredient.AMQ) === Ingredient.AMQ) ? true : false;
        this.eth = ((body.options & Ingredient.ETH) === Ingredient.ETH) ? true : false;
        this.btc = ((body.options & Ingredient.BTC) === Ingredient.BTC) ? true : false;
        this.graphql = ((body.options & Ingredient.GRAPHQL) === Ingredient.GRAPHQL) ? true : false;
        this.kafka = ((body.options & Ingredient.KAFKA) === Ingredient.KAFKA) ? true : false;
        this.logging = ((body.options & Ingredient.LOGGING) === Ingredient.LOGGING) ? true : false;
        this.mongo = ((body.options & Ingredient.MONGO) === Ingredient.MONGO) ? true : false;
        this.mysql = ((body.options & Ingredient.MYSQL) === Ingredient.MYSQL) ? true : false;
        this.neo4j = ((body.options & Ingredient.NEO4J) === Ingredient.NEO4J) ? true : false;
        this.oauth = ((body.options & Ingredient.OAUTH) === Ingredient.OAUTH) ? true : false;
        this.postGres = ((body.options & Ingredient.PG) === Ingredient.PG) ? true : false;
        this.redis = ((body.options & Ingredient.REDIS) === Ingredient.REDIS) ? true : false;
        this.s3 = ((body.options & Ingredient.S3) === Ingredient.S3) ? true : false;
        this.sqlServer = ((body.options & Ingredient.SQLSERVER) === Ingredient.SQLSERVER) ? true : false;
        this.webAuth = ((body.options & Ingredient.WEBAUTH) === Ingredient.WEBAUTH) ? true : false;
        this.docker = ((body.options & Ingredient.DOCKER) === Ingredient.DOCKER) ? true : false;
        this.swagger = ((body.options & Ingredient.SWAGGER) === Ingredient.SWAGGER) ? true : false;
        if(this.amq){
            logger.info(`AMQ set`);
        }
        if(this.eth){
            logger.info(`ETH set`);
        }
        if(this.btc){
            logger.info(`BTC set`);
        }
        if(this.graphql){
            logger.info(`Graphql set`);
        }
        if(this.kafka){
            logger.info(`Kafka set`);
        }
        if(this.logging){
            logger.info(`Logging set`);
        }
        if(this.mongo){
            logger.info(`Mongo set`);
        }
        if(this.mysql){
            logger.info(`MySql set`);
        }
        if(this.neo4j){
            logger.info(`Neo4j set`);
        }
        if(this.oauth){
            logger.info(`OAuth set`);
        }
        if(this.postGres){
            logger.info(`PostGres set`);
        }
        if(this.redis){
            logger.info(`redis set`);
        }
        if(this.s3){
            logger.info(`s3 set`);
        }
        if(this.sqlServer){
            logger.info(`sql server set`);
        }
        if(this.webAuth){
            logger.info(`web auth set`);
        }
        if(this.docker){
            logger.info(`Docker set`);
        }
        if(this.swagger){
            logger.info(`Swagger set`);
        }
    }

    private createAuth = async(): Promise<IFileContent[]> => { 
        logger.info(`Creating authentication`);
        let files: IFileContent[] = [];
        
        if(this.webAuth) {
            let authMdl = await CoreService.readFile(this.dir + `templates/src-middlewares-auth.middleware.ts.txt`);
            files.push({ path: `src/middlewares/auth.middleware.ts`, content: authMdl });
            let authSvc = await CoreService.readFile(this.dir + `templates/src-services-auth.service.ts.txt`);
            files.push({ path: `src/services/auth.service.ts`, content: authSvc });
        }

        files = this.updateFileHeaders(files);

        return files;
    }

    private createEnv = async(): Promise<string> => {
        logger.info(`Creating .ENV file`);
        let env = await CoreService.readFile(this.dir + `templates/.env.txt`);
        const tokenConfig = !this.webAuth && !this.oauth ? '' : `
TOKEN_SECRET=`;
        let loggingConfigs = !this.logging ? '' : `
LOGLEVEL=silly
        `;
        let mongoConfigs = !this.mongo ? '' : `
MONGOUSER=
MONGOHOST=
MONGOPASS=
MONGODATABASE=
MONGOPORT=`;
        let mysqlConfigs = !this.mysql ? '' : `
MYSQLUSER=
MYSQLHOST=
MYSQLPASS=
MYSQLDATABASE=
MYSQLPORT=`;
        let pgConfigs = !this.postGres ? '' : `
PGUSER=
PGHOST=
PGDATABASE=
PGPASS=
PGPORT=`;
        let redisConfigs = !this.redis ? '' : `
REDISUSER=
REDISHOST=
REDISDATABASE=
REDISPASS=
REDISPORT=`;
        let sqlServerConfigs = !this.redis ? '' : `
SQLSVRUSER=
SQLSVRHOST=
SQLSVRDATABASE=
SQLSVRPASS=
SQLSVRPORT=`;
        env = env
                .replace(/TOKEN-OPTIONS/g, tokenConfig)
                .replace(/LOGGING-OPTIONS/g, loggingConfigs)
                .replace(/MONGO-OPTIONS/g, mongoConfigs)
                .replace(/MYSQL-OPTIONS/g, mysqlConfigs)
                .replace(/PG-OPTIONS/g, pgConfigs)
                .replace(/REDIS-OPTIONS/g, redisConfigs)
                .replace(/SQLSVR-OPTIONS/g, sqlServerConfigs);
        return env;
    }

    private createLogging = async(): Promise<IFileContent[]> => { 
        logger.info(`Creating logging`);
        const files: IFileContent[] = [];
        
        if(this.logging) {
            let loggingSvc = await CoreService.readFile(this.dir + `templates/src-services-logger.service.ts.txt`);
            loggingSvc = this.setFileHeaderValues(loggingSvc);
            files.push({ path: `src/services/logging.service.ts`, content: loggingSvc });

            let loggingMdl = await CoreService.readFile(this.dir + `templates/src-middlewares-logging.middleware.ts.txt`);            
            loggingMdl = this.setFileHeaderValues(loggingMdl);        
            files.push({ path: `src/middlewares/logging.middleware.ts`, content: loggingMdl });
        }

        return files;
    }

    private createReadme = async(): Promise<string> => {     
        logger.info(`Creating README.md`);    
        let readme = await CoreService.readFile(this.dir + `templates/readme.md.txt`);
        
        let options = "";
        if(this.amq) {
            options += `
            * Active MQ  `;
        }
        if(this.btc) {
            options += `
            * Bitcoin Core  `;
        }
        if(this.eth) {
            options += `
            * Ethereum  `;
        }
        if(this.graphql) {
            options += `
            * GraphQL  `;
        }
        if(this.webAuth) {
            options += `
            * JWT Authentication  `;
        }
        if(this.kafka) {
            options += `
            * Kafka  `;
        }
        if(this.logging) {
            options += `
            * Logging  `;
        }
        if(this.mongo) {
            options += `
            * MongoDB  `;
        }
        if(this.mysql) {
            options += `
            * MySql  `;
        }
        if(this.neo4j) {
            options += `
            * Neo4j  `;
        }
        if(this.oauth) {
            options += `
            * OAUTH  `;
        }
        if(this.postGres) {
            options += `
            * PostgreSQL  `;
        }
        if(this.redis) {
            options += `
            * Redis  `;
        }
        if(this.s3) {
            options += `
            * S3  `;
        }
        if(this.sqlServer) {
            options += `
            * SQL Server  `;
        }
        if(options.length > 0){
            options = `Included options:
            ` + options;
        }

        readme = readme
                .replace(/NAME-HERE/g, this.appName)
                .replace(/OPTIONS-HERE/g, options)
        
        return readme;
    }

    private createPackageJson = async(projectName: string): Promise<string> => { 
        logger.info(`Creating package.json`);       
        let packageJson = await CoreService.readFile(this.dir + `templates/package.json.txt`);

        let loggingType = !this.logging ? '' : `
    "@types/winston": "^2.4.4",`;
        let loggingDep = !this.logging ? '' : `
    "winston": "^3.3.3",`;
        let mongoType = !this.mongo ? '' : `
    "@types/mongodb": "^3.5.27",`;
        let mongoDep = !this.mongo ? '' : `
    "mongodb": "^3.6.2",`;
        let mysqlType = !this.mysql ? '' : `
    "@types/mysql": "^2.15.16",`;
        let mysqlDep = !this.mysql ? '' : `
    "mysql": "^2.18.1",`;
        let pgType = !this.postGres ? '' : `
    "@types/pg": "^7.14.4",`
        let pgDep = !this.postGres ? '' : `
    "pg": "^8.3.3",`;
        let redisType = !this.redis ? '' : `
    "@types/redis": "^2.8.27",`;
        let redisDep = !this.redis ? '' : `
    "redis": "^3.0.2",`;
        let sqlServerType = !this.redis ? '' : `
    "@types/mssql": "^6.0.4",`;
        let sqlServerDep = !this.redis ? '' : `
    "mssql": "^6.2.2",`;

        packageJson = packageJson
                        .replace(/Project-Name/g, projectName)
                        .replace(/Project-Description/g, 'Description goes here')
                        .replace(/WINSTON-TYPE/g, loggingType)
                        .replace(/WINSTON-DEP/g, loggingDep)
                        .replace(/MONGO-TYPE/g, mongoType)
                        .replace(/MONGO-DEP/g, mongoDep)
                        .replace(/MSSQL-TYPE/g, sqlServerType)
                        .replace(/MSSQL-DEP/g, sqlServerDep)
                        .replace(/MYSQL-TYPE/g, mysqlType)
                        .replace(/MYSQL-DEP/g, mysqlDep)
                        .replace(/PG-TYPE/g, pgType)
                        .replace(/PG-DEP/g, pgDep)
                        .replace(/REDIS-TYPE/g, redisType)
                        .replace(/REDIS-DEP/g, redisDep);

        return packageJson;
    }

    private createGitignore = async(): Promise<string> => {     
        logger.info(`Creating .gitignore`);   
        let gitignore = await CoreService.readFile(this.dir + `templates/.gitignore.txt`);

        return gitignore;
    }

    private createTsConfig = async(): Promise<string> => {     
        logger.info(`Creating tsconfig.json`);   
        let gitignore = await CoreService.readFile(this.dir + `templates/tsconfig.json.txt`);

        return gitignore;
    }

    private createEnvironments = async(): Promise<string> => {  
        logger.info(`creating environment files`);      
        let environment = await CoreService.readFile(this.dir + `templates/src-environments-environment.ts.txt`);

        const loggingConfig = !this.logging ? '' : `
            LOGLEVEL: string;`;
        const tokenConfig = !this.webAuth && !this.oauth ? '' : `
            TOKEN_SECRET: string;`
        const mongoConfigs = !this.mongo ? '' : `
            MONGODB: string;
            MONGOUSER: string;
            MONGOHOST: string;
            MONGOPASSWORD: string;
            MONGODATABASE: string;
            MONGOPORT: number`;
        const mysqlConfigs = !this.mysql ? '' : `
            MYSQLDB: string;
            MYSQLUSER: string;
            MYSQLHOST: string;
            MYSQLPASSWORD: string;
            MYSQLDATABASE: string;
            MYSQLPORT: number`;
        const pgConfigs = !this.postGres ? '' : `
            PGUSER: string;
            PGHOST: string;
            PGDATABASE: string;
            PGPASSWORD: string;
            PGPORT: number;`;
        const redisConfigs = !this.redis ? '' : `
            REDISUSER: string;
            REDISHOST: string;
            REDISDATABASE: string;
            REDISPASSWORD: string;
            REDISPORT: number;`;
        const sqlServerConfigs = !this.redis ? '' : `
            SQLSVRUSER: string;
            SQLSVRHOST: string;
            SQLSVRDATABASE: string;
            SQLSVRPASSWORD: string;
            SQLSVRPORT: number;`;

        environment = environment
                    .replace(/TOKEN-CONFIG/g, tokenConfig)
                    .replace(/LOGGING-CONFIG/g, loggingConfig)
                    .replace(/MONGO-CONFIG/g, mongoConfigs)
                    .replace(/MYSQL-CONFIG/g, mysqlConfigs)
                    .replace(/PG-CONFIG/g, pgConfigs)
                    .replace(/REDIS-CONFIG/g, redisConfigs)
                    .replace(/SQLSVR-CONFIG/g, sqlServerConfigs);

        environment = this.setFileHeaderValues(environment);

        return environment;
    }

    private createRoutes = async(): Promise<IFileContent[]> => {
        logger.info(`Creating routes`);
        let routes: IFileContent[] = [];
        let indexRte = await CoreService.readFile(this.dir + `templates/src-routes-index.ts.txt`);
        let routeDeclarations: string = '';
        let routeUses: string = '';
        if(this.oauth || this.webAuth) {
            routeDeclarations += `
import login from './login.route';`
            routeUses += `
routes.use('/login', login);`
        }
        if(this.mongo) {
            routeDeclarations += `
import mongo from './mongo.route';`
            routeUses += `
routes.use('/mongo', mongo);`
        }
        if(this.sqlServer) {
            routeDeclarations += `
import mssql from './mssql.route';`
routeUses += `
routes.use('/mssql', mssql);`
        }
        if(this.mysql) {
            routeDeclarations += `
import mysql from './mysql.route';`
routeUses += `
routes.use('/mysql', mysql);`
        }
        if(this.postGres) {
            routeDeclarations += `
import pg from './pg.route';`
routeUses += `
routes.use('/pg', pg);`
        }
        if(this.redis) {
            routeDeclarations += `
import redis from './redis.route';`
routeUses += `
routes.use('/redis', redis);`
        }
        indexRte = indexRte
                    .replace(/ROUTE-DECLARATIONS/g, routeDeclarations)
                    .replace(/ROUTE-USES/g, routeUses);

        routes.push({ path: `src/routes/index.ts`, content: indexRte});
        let helloWorldRoute = await CoreService.readFile(this.dir + `templates/src-routes-hello-world.route.ts.txt`);
        routes.push({ path: `src/routes/hello-world.route.ts`, content: helloWorldRoute });

        let loginRte = this.webAuth ? await CoreService.readFile(this.dir + `templates/src-routes-login.route.ts.txt`) : null;
        if(loginRte !== null) {
            routes.push({ path: `src/routes/login.route.ts`, content: loginRte });
        }
        let mongoRte = this.mongo ? await CoreService.readFile(this.dir + `templates/src-routes-mongo.route.ts.txt`) : null;
        if(mongoRte !== null) {
            routes.push({ path: `src/routes/mongo.route.ts`, content: mongoRte });
        }
        let mssqlRte = this.sqlServer ? await CoreService.readFile(this.dir + `templates/src-routes-mssql.route.ts.txt`) : null;
        if(mssqlRte !== null) {
            routes.push({ path: `src/routes/mssql.route.ts`, content: mssqlRte });
        }
        let mysqlRte = this.mysql ? await CoreService.readFile(this.dir + `templates/src-routes-mysql.route.ts.txt`) : null;
        if(mysqlRte !== null) {
            routes.push({ path: `src/routes/mysql.route.ts`, content: mysqlRte });
        }
        let pgRte = this.postGres ? await CoreService.readFile(this.dir + `templates/src-routes-pg.route.ts.txt`) : null;
        if(pgRte !== null) {
            routes.push({ path: `src/routes/pg.route.ts`, content: pgRte });
        }
        let redisRte = this.redis ? await CoreService.readFile(this.dir + `templates/src-routes-redis.route.ts.txt`) : null;
        if(redisRte !== null) {
            routes.push({ path: `src/routes/redis.route.ts`, content: redisRte });
        }

        routes = this.updateFileHeaders(routes);

        return routes;
    }

    private createControllers = async(): Promise<IFileContent[]> => {
        logger.info(`Creating controllers`);
        let controllers: IFileContent[] = [];

        let helloWorldCtrl = await CoreService.readFile(this.dir + `templates/src-controllers-hello-world.controller.ts.txt`);
        controllers.push({ path: `src/controllers/hello-world.controller.ts`, content: helloWorldCtrl });

        let loginCtrl = this.webAuth ? await CoreService.readFile(this.dir + `templates/src-controllers-login.controller.ts.txt`) : null;
        if(loginCtrl !== null) {
            controllers.push({ path: `src/controllers/login.controller.ts`, content: loginCtrl });
        }
        let mongoCtrl = this.mongo ? await CoreService.readFile(this.dir + `templates/src-controllers-mongo.controller.ts.txt`) : null;
        if(mongoCtrl !== null) {
            controllers.push({ path: `src/controllers/mongo.controller.ts`, content: mongoCtrl });
        }
        let mssqlCtrl = this.sqlServer ? await CoreService.readFile(this.dir + `templates/src-controllers-mssql.controller.ts.txt`) : null;
        if(mssqlCtrl !== null) {
            controllers.push({ path: `src/controllers/mssql.controller.ts`, content: mssqlCtrl });
        }
        let mysqlCtrl = this.mysql ? await CoreService.readFile(this.dir + `templates/src-controllers-mysql.controller.ts.txt`) : null;
        if(mysqlCtrl !== null) {
            controllers.push({ path: `src/controllers/mysql.controller.ts`, content: mysqlCtrl });
        }
        let pgCtrl = this.postGres ? await CoreService.readFile(this.dir + `templates/src-controllers-pg.controller.ts.txt`) : null;
        if(pgCtrl !== null) {
            controllers.push({ path: `src/controllers/pg.controller.ts`, content: pgCtrl });
        }
        let redisCtrl = this.redis ? await CoreService.readFile(this.dir + `templates/src-controllers-redis.controller.ts.txt`) : null;
        if(redisCtrl !== null) {
            controllers.push({ path: `src/controllers/redis.controller.ts`, content: redisCtrl });
        }

        controllers = this.updateFileHeaders(controllers);

        return controllers;
    }

    private createRepositories = async(): Promise<IFileContent[]> => {
        logger.info(`Creating repositories`);
        let repos: IFileContent[] = [];

        let mongoRepo = this.mongo ? await CoreService.readFile(this.dir + `templates/src-data-mongo.repo.ts.txt`) : null;
        let mssqlRepo = this.sqlServer ? await CoreService.readFile(this.dir + `templates/src-data-mssql.repo.ts.txt`) : null;
        let mysqlRepo = this.mysql ? await CoreService.readFile(this.dir + `templates/src-data-mysql.repo.ts.txt`) : null;
        let pgRepo = this.postGres ? await CoreService.readFile(this.dir + `templates/src-data-pg.repo.ts.txt`) : null;
        let redisRepo = this.redis ? await CoreService.readFile(this.dir + `templates/src-data-redis.repo.ts.txt`) : null;

        if(mongoRepo !== null) {
            repos.push({ path: `src/data/mongo.repo.ts`, content: mongoRepo });
        }
        if(mssqlRepo !== null) {
            repos.push({ path: `src/data/mssql.repo.ts`, content: mssqlRepo });
        }
        if(mysqlRepo !== null) {
            repos.push({ path: `src/data/mysql.repo.ts`, content: mysqlRepo });
        }
        if(pgRepo !== null) {
            repos.push({ path: `src/data/pg.repo.ts`, content: pgRepo });
        }
        if(redisRepo !== null) {
            repos.push({ path: `src/data/redis.repo.ts`, content: redisRepo });
        }

        repos = this.updateFileHeaders(repos);

        return repos;
    }

    private dockerize = async(): Promise<IFileContent[]> => {
        logger.info(`Creating docker items`);
        let files: IFileContent[] = [];

        let dockerIgnore = await CoreService.readFile(this.dir + `templates/.dockerignore.txt`);
        files.push({ path: `.dockerignore`, content: dockerIgnore });

        let dockerfile = await CoreService.readFile(this.dir + `templates/DkrFl.txt`);
        files.push({ path: `Dockerfile`, content: dockerfile });

        let dockerCompose = await CoreService.readFile(this.dir + `templates/dkr-cmps.yml.txt`);
        dockerCompose = dockerCompose.replace(/{APP-NAME}/g, this.appName);

        files.push({ path: `docker-compose.yml`, content: dockerCompose });

        files = this.updateFileHeaders(files);

        return files;
    }

    private setFileHeaderValues(content: string, now?: string) {
        if(typeof(now) === 'undefined') {
            now = this.getFormattedDateTime();
        }
        const loggerImpl = !this.logging ? '' : `
import { logger } from '../services/logger.service';`;
        const logger = !this.logging ? 'console.log' : 'logger.info';
        const loggerError = ~this.logging ? 'console.error' : 'logger.error';
        const loggerMdlwrImpl = !this.logging ? '' : `
import { logUrl, logType, logHeaders, logBody } from '../middlewares/logging.middleware';`;
        const routeLogging = !this.logging ? '' : '[ logUrl, logType, logHeaders, logBody ], ';

        content = content
                    .replace(/{YEAR}/g, new Date().getFullYear().toString())
                    .replace(/{AUTHOR}/g, "TS-Oven: https://ts-oven.com")
                    .replace(/{CREATED}/g, now)
                    .replace(/{MODIFIED}/g, now)
                    .replace(/{logger-impl}/g, loggerImpl)
                    .replace(/{logger}/g, logger)
                    .replace(/{logger-error}/g, loggerError)
                    .replace(/{logger-mddlwr-impl}/g, loggerMdlwrImpl)
                    .replace(/{route-logging}/g, routeLogging);

        return content;
    }

    private updateFileHeader(file: IFileContent, now?: string): IFileContent {      
        if(typeof(now) === 'undefined') {
            now = this.getFormattedDateTime();
        }      
        file.content = this.setFileHeaderValues(file.content, now);

        return file;
    }

    private updateFileHeaders(files: IFileContent[]): IFileContent[] {
        if(files.length === 0) {
            return files;
        }
        const now = this.getFormattedDateTime();
        files.forEach(file => {            
            file = this.updateFileHeader(file, now);            
        });
        return files;
    }

    private getFormattedDateTime(): string {
        const now = new Date();
        const day = now.getUTCDate();
        const month = now.getUTCMonth() + 1;
        const year = now.getUTCFullYear();
        const hour = now.getUTCHours();
        const minutes = now.getUTCMinutes();
        const seconds = now.getUTCSeconds();

        return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    }
}

export default OvenController;