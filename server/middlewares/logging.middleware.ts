import { Request, Response } from 'express';

export const logUrl = async(req: Request, _res: Response, next: Function) => {
    console.log(`New request to: '${req.url}'`);
    
    next();
}

export const logType = async(req: Request, _res: Response, next: Function) => {    
    console.log(`Request type:`, req.method);
    
    next();
}

export const logHeaders = async(req: Request, _res: Response, next: Function) => {    
    console.log(`Request headers:`, req.headers);
    
    next();
}

export const logBody = async(req: Request, _res: Response, next: Function) => {    
    console.log(`Request body:`, req.body);
    
    next();
}