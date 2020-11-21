// /// <reference path="../interfaces/base.interface.ts" />
// import express from 'express';
// //import { Base } from '../data/mongo-base.repo';
// import { logger } from '../services/logger.service';

// class MongoControllerII {

//     constructor() { }

//     static add = async(req: express.Request, res: express.Response) => {
//         const { id, name } = req.body;
        
//         const base = IBase.build({ id: id, name: name });
//         let insertStatus = false;
//         try {
//             await base.save();
//             insertStatus = true;
//         } catch(err) {
//             console.error(err);
//             insertStatus = false;
//         }
//         const status = insertStatus ? 201 : 500;

//         res.status(status).json(insertStatus);
//     }
    
//     static get = async(req: express.Request, res: express.Response) => {
//         const id = req.params.id;
//         const datas = await Base.find({ id: id });

//         res.status(200).json(datas);
//     }
    
//     static getAll = async(req: express.Request, res: express.Response) => {
//         logger.info(`request from: ${req.ip}`);
        
//         const datas = await Base.find({});

//         res.status(200).json(datas);
//     }

//     static update = async(req: express.Request, res: express.Response) => {
//         const { id, name } = req.body;

//         const datas = await Base.update({ id: id }, { name: name });

//         res.status(200).json(datas);
//     }

//     static delete = async(req: express.Request, res: express.Response) => {
//         const id = req.params.id;

//         const datas = await Base.deleteOne({ id: id });

//         res.status(200).json(datas);
//     }
// }

// export default MongoControllerII;
