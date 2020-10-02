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