/**
 * Copyright (c) 2020
 * 
 * MySql Controller handle mysql db requests
 * 
 * @summary MySql controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import express from 'express';
import MySqlBaseRepo from '../data/mysql-base.repo';
import { Logger} from 'tslog';

class MySqlController {
    private repo: MySqlBaseRepo = new MySqlBaseRepo();
    private log: Logger;

    constructor() {
        this.log = new Logger();
    }

    public add = async(req: express.Request, res: express.Response) => {
        const rows = await this.repo.add(req.body);
        
        const status = rows !== null ? 201 : 500;

        res.status(status).json(rows);
    }

    public get = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        if(typeof id === 'undefined') {
            await this.getAll(req, res);
        } else {
            const datas = await this.repo.get(id);
            const status = datas !== null ? 200 : 500;

            res.status(status).json(datas);
        }
    }

    public getAll = async(req: express.Request, res: express.Response) => {
        this.log.info(`request from: ${req.ip}`);
        const datas = await this.repo.getAll();
        const status = datas !== null ? 200 : 500;
        
        res.status(status).json(datas);
    }

    public update = async(req: express.Request, res: express.Response) => {
        const rows = await this.repo.update(req.body);
        
        const status = rows !== null ? 200 : 500;

        res.status(status).json(rows);
    }

    public delete = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const rows = await this.repo.delete(id);        
        const status = rows !== null ? 200 : 500;

        res.status(status).json(rows);
    }
}

export default MySqlController;
