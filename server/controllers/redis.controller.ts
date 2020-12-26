/**
 * Copyright (c) 2020
 * 
 * Redis Controller handle requests for Redis db
 * 
 * @summary Redis controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
/// <reference path="../interfaces/account.interface.ts" />
// import express from 'express';
// import RedisBaseRepo from '../data/redis-base.repo';
// import { logger } from '../services/logger.service';

// class RedisController {
//     private repo: RedisBaseRepo;

//     constructor() { 
//         this.repo = new RedisBaseRepo();
//     }

//     public add = async(req: express.Request, res: express.Response) => {
//         const key: string = req.params.key;
//         const value: string = req.body.value;
//         let insertStatus = false;

//         try {
//             const result = await this.repo.addString(key, value);
//             insertStatus = true
//         } catch(err) {
//             logger.error(err);
//             insertStatus = false;
//         }

//         const status = insertStatus ? 201 : 500;

//         res.status(status).json(insertStatus);
//     }

//     public addObject = async(req: express.Request, res: express.Response) => {
//         const key: string = req.params.key;
//         const account: IAccount = req.body;
//         let insertStatus = false;

//         try {
//             const result = await this.repo.addObject(key, account);
//             insertStatus = true
//         } catch(err) {
//             logger.error(err);
//             insertStatus = false;
//         }

//         const status = insertStatus ? 201 : 500;

//         res.status(status).json(insertStatus);
//     }

//     public get = async(req: express.Request, res: express.Response) => {
//         const key = req.params.key;
//         const datas = await this.repo.getString(key);

//         res.status(200).json(datas);
//     }

//     public getMany = async(req: express.Request, res: express.Response) => {
//         const keys = req.body;
//         const datas = await this.repo.getMany(keys);

//         res.status(200).json(datas);
//     }

//     public getKeys = async(req: express.Request, res: express.Response) => {
//         logger.info(`request from: ${req.ip}`);
//         const datas = await this.repo.getKeys();

//         if(datas.length > 0) {
//             res.status(200).json(datas);
//         } else {
//             res.status(200).json([]);
//         }
//     }

//     public update = async(req: express.Request, res: express.Response) => {
//         const key = req.params.key;
//         const value = req.body.value;
//         let updateStatus = false;

//         try {
//             const result = await this.repo.update(key, value);
//             updateStatus = true
//         } catch(err) {
//             logger.error(err);
//             updateStatus = false;
//         }

//         const status = updateStatus ? 201 : 500;

//         res.status(status).json(updateStatus);
//     }

//     public delete = async(req: express.Request, res: express.Response) => {
//         const key = req.params.key;
//         let deleteStatus = false;
        
//         try {
//             const result = await this.repo.delete(key);
//             deleteStatus = true
//         } catch(err) {
//             logger.error(err);
//             deleteStatus = false;
//         }

//         const status = deleteStatus ? 201 : 500;

//         res.status(status).json(deleteStatus);
//     }
// }

// export default RedisController;
