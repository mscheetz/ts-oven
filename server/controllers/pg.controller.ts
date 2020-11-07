/**
 * Copyright (c) 2020
 * 
 * PG Controller handle requests for PostGreSQL db
 * 
 * @summary Pg controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import express from 'express';
import PGBaseRepo from '../data/pg-base.repo';
import { Logger} from 'tslog';

class PGController {
    private pg: PGBaseRepo = new PGBaseRepo();
    private log: Logger;

    constructor() {
        this.log = new Logger();
    }

    public add = async(req: express.Request, res: express.Response) => {
        const rows = await this.pg.add(req.body);
        
        const status = rows !== null ? 201 : 500;

        res.status(status).json(rows);
    }

    public get = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const datas = await this.pg.get(id);
        const status = datas !== null ? 200 : 500;

        res.status(status).json(datas);
    }

    public getAll = async(req: express.Request, res: express.Response) => {
        this.log.info(`request from: ${req.ip}`);
        const datas = await this.pg.getAll();
        const status = datas !== null ? 200 : 500;
        
        res.status(status).json(datas);
    }

    public update = async(req: express.Request, res: express.Response) => {
        const rows = await this.pg.update(req.body);
        
        const status = rows !== null ? 200 : 500;

        res.status(status).json(rows);
    }

    public delete = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const rows = await this.pg.delete(id);        
        const status = rows !== null ? 200 : 500;

        res.status(status).json(rows);
    }
}

export default PGController;
