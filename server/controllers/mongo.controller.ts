/**
 * Copyright (c) 2020
 * 
 * Mongo Controller handle mongo db requests
 * 
 * @summary Mongo controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
/// <reference path="../interfaces/account.interface.ts" />
import express from 'express';
import MongoAccount from '../data/mongo-account.repo';
import { LogLevel } from '../interfaces/enums';
import LogService from '../services/log.service';

class MongoController {
    private repo: MongoAccount;

    constructor() { 
        this.repo = new MongoAccount();
    }

    public add = async(req: express.Request, res: express.Response) => {
        const account: IAccount = req.body;
        let insertStatus = false;

        try {
            const result = await this.repo.add(account);
            insertStatus = true
        } catch(err) {
            LogService.writeLog(LogLevel.ERROR, err);
            insertStatus = false;
        }

        const status = insertStatus ? 201 : 500;

        res.status(status).json(insertStatus);
    }

    public get = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        const datas = await this.repo.get(+id);

        if(datas.length > 0) {
            res.status(200).json(datas[0]);
        } else {
            res.status(200).json([]);
        }
    }

    public getAll = async(req: express.Request, res: express.Response) => {
        LogService.writeLog(LogLevel.INFO, `request from: ${req.ip}`);
        const datas = await this.repo.getAll();

        if(datas.length > 0) {
            res.status(200).json(datas);
        } else {
            res.status(200).json([]);
        }
    }

    public update = async(req: express.Request, res: express.Response) => {
        const account = req.body;
        
        const datas = await this.repo.update(account);
        let updateStatus = false;
        
        try {
            const result = await this.repo.update(account);
            updateStatus = true
        } catch(err) {
            LogService.writeLog(LogLevel.ERROR, err);
            updateStatus = false;
        }

        const status = updateStatus ? 201 : 500;

        res.status(status).json(updateStatus);
    }

    public delete = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;
        let deleteStatus = false;
        
        try {
            const result = await this.repo.delete(+id);
            deleteStatus = true
        } catch(err) {
            LogService.writeLog(LogLevel.ERROR, err);
            deleteStatus = false;
        }

        const status = deleteStatus ? 201 : 500;

        res.status(status).json(deleteStatus);
    }
}

export default MongoController;
