/**
 * Copyright (c) 2020
 * 
 * PG Base Repository interact with PostGreSql baseTable
 * 
 * @summary PG Base Repository
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
/// <reference path="../interfaces/base.interface.ts"/>
import { Pool } from 'pg';

class PGBaseRepo {
    private pool: Pool;

    constructor() {
        const port: number = +process.env.PGPORT!;
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: port,
            ssl: { rejectUnauthorized: false }
        });
    }
    
    public get = async(id: string) => {
        const sql = `select id, name
        from public."baseTable"
        where id = $1`;

        try {
            const res = await this.pool.query(sql, [ id ]);

            return res.rows;
        } catch(err) {
            console.log(err);

            return null;
        }
    }
    
    public getAll = async() => {
        const sql = `select id, name
        from public."baseTable"`;

        try {
            const res = await this.pool.query(sql);

            return res.rows;
        } catch(err) {
            console.log(err);
            
            return null;
        }
    }
    
    public add = async(base: IBase) => {
        const sql = `insert into public."baseTable" ( id, name )
        values ( $1, $2 )`;

        const data = [
            base.id,
            base.name
        ];

        try {
            const res = await this.pool.query(sql, data);

            return res.rowCount;
        } catch(err) {
            console.log(err);
            
            return null;
        }
    }
    
    public update = async(base: IBase) => {
        const sql = `update public."baseTable" set name = $2
        where id = $1`;

        const data = [
            base.id,
            base.name
        ];

        try {
            const res = await this.pool.query(sql, data);

            return res.rowCount;
        } catch(err) {
            console.log(err);
            
            return null;
        }
    }
    
    public delete = async(id: string) => {
        const sql = `delete from public."baseTable"
        where id = $1`;

        try {
            const res = await this.pool.query(sql, [ id ]);

            return res.rowCount;
        } catch(err) {
            console.log(err);
            
            return null;
        }
    }

}

export default PGBaseRepo;
