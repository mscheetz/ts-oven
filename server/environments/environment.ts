declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            ENVIRONMENT: string;
            TOKEN_SECRET: string;
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