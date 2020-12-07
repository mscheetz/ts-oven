/**
 * Copyright (c) 2020
 * 
 * Version Controller gets npm package versions
 * 
 * @summary Version Controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-12-06
 * Last modified    : 2020-12-06
 */
import express from 'express';
import NPMRepo from '../data/npm.repo';
import { logger } from '../services/logger.service';

class VersionController {

    constructor() { }

    static get = async(req: express.Request, res: express.Response) => {
        const pkg = req.query.package;
        if(typeof pkg === 'string') {
            logger.info(`Get versions for: '${pkg}'`);

            let npmRepo = new NPMRepo();
            const versions = await npmRepo.getVersions(pkg);

            res.status(200).send(versions);
        } else {
            const message = "invalid request";
            res.status(400).send(message);
        }
    }
}

export default VersionController;