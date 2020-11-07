/**
 * Copyright (c) 2020
 * 
 * Base Controller returns a response and ip of requestor
 * 
 * @summary Base controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import express from 'express';

class BaseController {

    constructor() { }

    static response = async(req: express.Request, res: express.Response) => {
        const message = {
            from: req.ip,
            status: 200
        };
        res.json(message);
    }
}

export default BaseController;