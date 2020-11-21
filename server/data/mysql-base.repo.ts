/**
 * Copyright (c) 2020
 * 
 * MySql Base Repository interact with MySql baseTable
 * 
 * @summary MySql Base Repository
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
/// <reference path="../interfaces/base.interface.ts"/>
import mysql from 'mysql';
import dotenv from 'dotenv';
import { logger } from '../services/logger.service';

class MySqlBaseRepo {
    private pool: mysql.Pool;
    private table: string;

    constructor() {
        dotenv.config();
        this.table = "baseTable"
        const port: number = +process.env.MYSQLPORT!;
        this.pool = mysql.createPool({
            user: process.env.MYSQLUSER,
            host: process.env.MYSQLHOST,
            database: process.env.MYSQLDB,
            password: process.env.MYSQLPASS,
            port: port
        });
        this.testConnection();
        this.createTable();
    }

    public testConnection = async() => {
        return new Promise((res, rej) => {
            this.pool.getConnection((err, connection) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                logger.info(`Successfull connection to MySQL DB`);
                connection.release();
                return res();
            });
        });
    }

    public createTable = async() => {
        const sql = `create table if not exists ${this.table}(
            id varchar(255) not null,
            name varchar(255) not null 
        )`;

        return new Promise((res, rej) => {
            this.pool.query(sql, (err, results) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                if(results.warningCount === 0) {
                    logger.info(`Table ${this.table} created`);
                }
                return res(results);
            });
        });
    }

    public get = async(id: string) => {
        const sql = `select id, name
        from ${this.table}
        where id = $1`;

        return new Promise((res, rej) => {
            this.pool.query(sql, [ id ], (err, results) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                return res(results);
            });
        });
    }
    
    public getAll = async() => {
        const sql = `select id, name
        from ${this.table}`;

        return new Promise((res, rej) => {
            this.pool.query(sql, (err, results) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                return res(results);
            });
        });
    }
    
    public add = async(base: IBase) => {
        const sql = `insert into ${this.table} ( id, name )
        values ( ?, ? )`;

        const data = [
            base.id,
            base.name
        ];
        
        return new Promise((res, rej) => {
            this.pool.query(sql, data, (err, result) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                return res(result.insertId);
            });
        });
    }
    
    public update = async(base: IBase) => {
        const sql = `update ${this.table} set name = ?
        where id = ?`;

        const data = [
            base.name,
            base.id
        ];

        return new Promise((res, rej) => {
            this.pool.query(sql, data, (err, result) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                return res(result.affectedRows);
            });
        });
    }
    
    public delete = async(id: string) => {
        const sql = `delete from ${this.table}
        where id = ?`;


        return new Promise((res, rej) => {
            this.pool.query(sql, [ id ], (err, result) => {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                return res(result.affectedRows);
            });
        });
    }

}

export default MySqlBaseRepo;
