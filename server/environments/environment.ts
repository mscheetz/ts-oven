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
            PORT: string;
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
            PGPORT: string;
            REDISPORT: string;
            REDISHOST: string;
            REDISSECRET: string;
            KAFKAHOST: string;
            KAFKAUSER: string;
            KAFKAPASSWORD: string;
            KAFKATOPICPRE: string;
            KAFKATOPICNAMES: string;
        }
    }
}

export {}