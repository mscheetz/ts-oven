/**
 * Copyright (c) 2020
 * 
 * Environment interface for .env variables
 * 
 * @summary Environment
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            LOGLEVEL: string;
            ENVIRONMENT: string;
            TOKEN_SECRET: string;
            BTC_XPUB: string;
            ETH: string;
            XMR: string;
            MONGOHOST: string;
            MONGODB: string;
            MONGOUSER: string;
            MONGOPASS: string;
            MYSQLHOST: string;
            MYSQLDB: string;
            MYSQLPORT: string;
            MYSQLUSER: string;
            MYSQLPASS: string;
            PGUSER: string;
            PGHOST: string;
            PGDATABASE: string;
            PGPASSWORD: string;
            PGPORT: number;
            REDISPORT: number;
            REDISHOST: string;
            REDISSECRET: string;
        }
    }
}

export {}