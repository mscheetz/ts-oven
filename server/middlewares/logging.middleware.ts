/**
 * Copyright (c) 2020
 * 
 * Logging Middleware intercepts requests and logs values
 * 
 * @summary LoggingMiddleware
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import { Request, Response } from 'express';
import { Logger} from 'tslog';

export const logUrl = async(req: Request, _res: Response, next: Function) => {
    const log: Logger = new Logger();
    log.info(`New request to: '${req.originalUrl}'`);
    
    next();
}

export const logType = async(req: Request, _res: Response, next: Function) => {
    const log: Logger = new Logger();
    log.info(`Request type:`, req.method);
    
    next();
}

export const logHeaders = async(req: Request, _res: Response, next: Function) => {
    const log: Logger = new Logger();
    log.info(`Request headers:`, req.headers); 
    
    next();
}

export const logBody = async(req: Request, _res: Response, next: Function) => {
    const log: Logger = new Logger();
    log.info(`Request body:`, req.body);
    
    next();
}