/**
 * Copyright (c) 2020
 * 
 * Oven Controller create new ts oven project
 * 
 * @summary Oven controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
/// <reference path="../interfaces/file-content.interface.ts" />
/// <reference path="../interfaces/dough.interface.ts" />
/// <reference path="../interfaces/enums.ts" />
import express from 'express';
import Archiver from 'archiver';
import path from 'path';
import CoreService from '../services/core.service';
import LogService from '../services/log.service';
import { Datastore, LogLevel } from '../interfaces/enums';
import { IDough } from '../interfaces/dough.interface';

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

    constructor() {
        this.dir = path.join(__dirname, '../');
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
            LogService.writeLog(LogLevel.INFO, `Archive wrote ${zip.pointer} bytes`);
        });

        res.attachment(`${this.appName}.zip`);

        zip.pipe(res);
        LogService.writeLog(LogLevel.INFO, `dir`, __dirname);
        LogService.writeLog(LogLevel.INFO, `dir II`, this.dir);

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
            let content = await CoreService.readFile(this.dir + `/templates/src-interfaces-base.interface.ts.txt`);
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
            })
        }

        const repos = await this.createRepositories();

        if(repos.length > 0) {
            repos.forEach(repo => {
                zip.append(repo.content, { name: repo.path });
            })
        }

        let env = await this.createEnv();
        
        let gitignore = await this.createGitignore();

        let packageJson = await this.createPackageJson(body.name);

        let readme = await this.createReadme();

        let indexTS = await CoreService.readFile(this.dir + `/templates/src-index.ts.txt`);
        indexTS = this.setFileHeaderValues(indexTS);
        
        LogService.writeLog(LogLevel.INFO, `Creating zip file`);
        zip.append(env, { name: `.env` })
           .append(gitignore, { name: `.gitignore` })
           .append(packageJson, { name: `package.json`})
           .append(readme, { name: `readme.md` })
           .append(indexTS, { name: `src/index.ts`})
           .append(environment, { name: `src/environments/environment.ts`})
           .finalize();
    }

    private setOptions(body: IDough) {
        LogService.writeLog(LogLevel.INFO, `Setting options`);
        this.amq = ((body.options & Datastore.AMQ) === Datastore.AMQ) ? true : false;
        this.eth = ((body.options & Datastore.ETH) === Datastore.ETH) ? true : false;
        this.btc = ((body.options & Datastore.BTC) === Datastore.BTC) ? true : false;
        this.graphql = ((body.options & Datastore.GRAPHQL) === Datastore.GRAPHQL) ? true : false;
        this.kafka = ((body.options & Datastore.KAFKA) === Datastore.KAFKA) ? true : false;
        this.logging = ((body.options & Datastore.LOGGING) === Datastore.LOGGING) ? true : false;
        this.mongo = ((body.options & Datastore.MONGO) === Datastore.MONGO) ? true : false;
        this.mysql = ((body.options & Datastore.MYSQL) === Datastore.MYSQL) ? true : false;
        this.neo4j = ((body.options & Datastore.NEO4J) === Datastore.NEO4J) ? true : false;
        this.oauth = ((body.options & Datastore.OAUTH) === Datastore.OAUTH) ? true : false;
        this.postGres = ((body.options & Datastore.PG) === Datastore.PG) ? true : false;
        this.redis = ((body.options & Datastore.REDIS) === Datastore.REDIS) ? true : false;
        this.s3 = ((body.options & Datastore.S3) === Datastore.S3) ? true : false;
        this.sqlServer = ((body.options & Datastore.SQLSERVER) === Datastore.SQLSERVER) ? true : false;
        this.webAuth = ((body.options & Datastore.WEBAUTH) === Datastore.WEBAUTH) ? true : false;
    }

    private createAuth = async(): Promise<IFileContent[]> => { 
        LogService.writeLog(LogLevel.INFO, `Creating authentication`);
        let files: IFileContent[] = [];
        
        if(this.webAuth) {
            let authMdl = await CoreService.readFile(this.dir + `/templates/src-middlewares-auth.middleware.ts.txt`);
            files.push({ path: `src/middlewares/auth.middleware.ts`, content: authMdl });
            let authSvc = await CoreService.readFile(this.dir + `/templates/src-services-auth.service.ts.txt`);
            files.push({ path: `src/services/auth.service.ts`, content: authSvc });
        }

        files = this.updateFileHeaders(files);

        return files;
    }

    private createEnv = async(): Promise<string> => {
        LogService.writeLog(LogLevel.INFO, `Creating .ENV file`);
        let env = await CoreService.readFile(this.dir + `/templates/.env.txt`);
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
                .replace(/MONGO-OPTIONS/g, mongoConfigs)
                .replace(/MYSQL-OPTIONS/g, mysqlConfigs)
                .replace(/PG-OPTIONS/g, pgConfigs)
                .replace(/REDIS-OPTIONS/g, redisConfigs)
                .replace(/SQLSVR-OPTIONS/g, sqlServerConfigs);
        return env;
    }

    private createLogging = async(): Promise<IFileContent[]> => { 
        LogService.writeLog(LogLevel.INFO, `Creating logging`);
        const files: IFileContent[] = [];
        
        if(this.logging) {
            let loggingMdl = await CoreService.readFile(this.dir + `/templates/src-middlewares-logging.middleware.ts.txt`);
            
            loggingMdl = this.setFileHeaderValues(loggingMdl);

            files.push({ path: `src/middlewares/logging.middleware.ts`, content: loggingMdl });
        }

        return files;
    }

    private createReadme = async(): Promise<string> => {     
        LogService.writeLog(LogLevel.INFO, `Creating README.md`);    
        let readme = await CoreService.readFile(this.dir + `/templates/readme.md.txt`);
        
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
        LogService.writeLog(LogLevel.INFO, `Creating package.json`);       
        let packageJson = await CoreService.readFile(this.dir + `/templates/package.json.txt`);

        let mongoType = !this.mongo ? '' : `
    "@types/mongodb": "^3.5.27",`;
        let mongoDep = !this.mongo ? '' : `
    "mongodb": "^3.6.2",`;
        let mysqlType = !this.mysql ? '' : `
    "@types/mysql": "^5.7.36",`;
        let mysqlDep = !this.mysql ? '' : `
    "mysql": "^5.10.5",`;
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
        LogService.writeLog(LogLevel.INFO, `Creating .gitignore`);   
        let gitignore = await CoreService.readFile(this.dir + `/templates/.gitignore.txt`);

        return gitignore;
    }

    private createEnvironments = async(): Promise<string> => {  
        LogService.writeLog(LogLevel.INFO, `creating environment files`);      
        let environment = await CoreService.readFile(this.dir + `/templates/src-environments-environment.ts.txt`);

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
                    .replace(/MONGO-CONFIG/g, mongoConfigs)
                    .replace(/MYSQL-CONFIG/g, mysqlConfigs)
                    .replace(/PG-CONFIG/g, pgConfigs)
                    .replace(/REDIS-CONFIG/g, redisConfigs)
                    .replace(/SQLSVR-CONFIG/g, sqlServerConfigs);

        environment = this.setFileHeaderValues(environment);

        return environment;
    }

    private createRoutes = async(): Promise<IFileContent[]> => {
        LogService.writeLog(LogLevel.INFO, `Creating routes`);
        let routes: IFileContent[] = [];
        let indexRte = await CoreService.readFile(this.dir + `/templates/src-routes-index.ts.txt`);
        let routeDeclarations: string = '';
        let routeUses: string = '';
        if(this.mongo) {
            routeDeclarations += `
import mongo from './mongo.route.ts';`
            routeUses += `
routes.use('/mongo', mongo);`
        }
        if(this.sqlServer) {
            routeDeclarations += `
import mssql from './mssql.route.ts';`
routeUses += `
routes.use('/mssql', mssql);`
        }
        if(this.mysql) {
            routeDeclarations += `
import mysql from './mysql.route.ts';`
routeUses += `
routes.use('/mysql', mysql);`
        }
        if(this.postGres) {
            routeDeclarations += `
import pg from './pg.route.ts';`
routeUses += `
routes.use('/pg', pg);`
        }
        if(this.redis) {
            routeDeclarations += `
import redis from './redis.route.ts';`
routeUses += `
routes.use('/redis', redis);`
        }
        indexRte = indexRte
                    .replace(/ROUTE-DECLARATIONS/g, routeDeclarations)
                    .replace(/ROUTE-USES/g, routeUses);

        routes.push({ path: `src/routes/index.ts`, content: indexRte});
        let loginRte = this.webAuth ? await CoreService.readFile(this.dir + `/templates/src-routes-login.route.ts.txt`) : null;
        if(loginRte !== null) {
            routes.push({ path: `src/routes/login.route.ts`, content: loginRte });
        }
        let mongoRte = this.mongo ? await CoreService.readFile(this.dir + `/templates/src-routes-mongo.route.ts.txt`) : null;
        if(mongoRte !== null) {
            routes.push({ path: `src/routes/mongo.route.ts`, content: mongoRte });
        }
        let mssqlRte = this.sqlServer ? await CoreService.readFile(this.dir + `/templates/src-routes-mssql.route.ts.txt`) : null;
        if(mssqlRte !== null) {
            routes.push({ path: `src/routes/mssql.route.ts`, content: mssqlRte });
        }
        let mysqlRte = this.mysql ? await CoreService.readFile(this.dir + `/templates/src-routes-mysql.route.ts.txt`) : null;
        if(mysqlRte !== null) {
            routes.push({ path: `src/routes/mysql.route.ts`, content: mysqlRte });
        }
        let pgRte = this.postGres ? await CoreService.readFile(this.dir + `/templates/src-routes-pg.route.ts.txt`) : null;
        if(pgRte !== null) {
            routes.push({ path: `src/routes/pg.route.ts`, content: pgRte });
        }
        let redisRte = this.postGres ? await CoreService.readFile(this.dir + `/templates/src-routes-redis.route.ts.txt`) : null;
        if(redisRte !== null) {
            routes.push({ path: `src/routes/redis.route.ts`, content: redisRte });
        }

        routes = this.updateFileHeaders(routes);

        return routes;
    }

    private createControllers = async(): Promise<IFileContent[]> => {
        LogService.writeLog(LogLevel.INFO, `Creating controllers`);
        let controllers: IFileContent[] = [];

        let loginCtrl = this.webAuth ? await CoreService.readFile(this.dir + `/templates/src-controllers-login.controller.ts.txt`) : null;
        if(loginCtrl !== null) {
            controllers.push({ path: `src/controllers/login.controller.ts`, content: loginCtrl });
        }
        let mongoCtrl = this.mongo ? await CoreService.readFile(this.dir + `/templates/src-controllers-mongo.controller.ts.txt`) : null;
        if(mongoCtrl !== null) {
            controllers.push({ path: `src/controllers/mongo.controller.ts`, content: mongoCtrl });
        }
        let mssqlCtrl = this.sqlServer ? await CoreService.readFile(this.dir + `/templates/src-controllers-mssql.controller.ts.txt`) : null;
        if(mssqlCtrl !== null) {
            controllers.push({ path: `src/controllers/mssql.controller.ts`, content: mssqlCtrl });
        }
        let mysqlCtrl = this.mysql ? await CoreService.readFile(this.dir + `/templates/src-controllers-mysql.controller.ts.txt`) : null;
        if(mysqlCtrl !== null) {
            controllers.push({ path: `src/controllers/mysql.controller.ts`, content: mysqlCtrl });
        }
        let pgCtrl = this.postGres ? await CoreService.readFile(this.dir + `/templates/src-controllers-pg.controller.ts.txt`) : null;
        if(pgCtrl !== null) {
            controllers.push({ path: `src/controllers/pg.controller.ts`, content: pgCtrl });
        }
        let redisCtrl = this.redis ? await CoreService.readFile(this.dir + `/templates/src-controllers-redis.controller.ts.txt`) : null;
        if(redisCtrl !== null) {
            controllers.push({ path: `src/controllers/redis.controller.ts`, content: redisCtrl });
        }

        controllers = this.updateFileHeaders(controllers);

        return controllers;
    }

    private createRepositories = async(): Promise<IFileContent[]> => {
        LogService.writeLog(LogLevel.INFO, `Creating repositories`);
        let repos: IFileContent[] = [];

        let mongoRepo = this.mongo ? await CoreService.readFile(this.dir + `/templates/src-data-mongo.repo.ts.txt`) : null;
        let mssqlRepo = this.sqlServer ? await CoreService.readFile(this.dir + `/templates/src-data-mssql.repo.ts.txt`) : null;
        let mysqlRepo = this.mysql ? await CoreService.readFile(this.dir + `/templates/src-data-mysql.repo.ts.txt`) : null;
        let pgRepo = this.postGres ? await CoreService.readFile(this.dir + `/templates/src-data-pg.repo.ts.txt`) : null;
        let redisRepo = this.redis ? await CoreService.readFile(this.dir + `/templates/src-data-redis.repo.ts.txt`) : null;

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

    private setFileHeaderValues(content: string, now?: string) {
        if(typeof(now) === 'undefined') {
            now = this.getFormattedDateTime();
        }
        content = content
                    .replace(/{YEAR}/g, new Date().getFullYear().toString())
                    .replace(/{AUTHOR}/g, "TS-Oven: https://ts-oven.com")
                    .replace(/{CREATED}/g, now)
                    .replace(/{MODIFIED}/g, now);

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