/**
 * Copyright (c) 2020
 * 
 * Api Logging Middleware intercepts requests and logs values
 * 
 * @summary ApiLoggingMiddleware
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
import { Request, Response } from 'express';
import { logger } from '../services/logger.service';

export const logUrl = async(req: Request, _res: Response, next: Function) => {
    const minLevel = process.env.LOGLEVEL;
    logger.info(`New request to: '${req.originalUrl}'`);
    
    next();
}

export const logType = async(req: Request, _res: Response, next: Function) => {
    logger.info(`Request type:`, req.method);
    
    next();
}

export const logHeaders = async(req: Request, _res: Response, next: Function) => {
    logger.info(`Request headers:`, req.headers); 
    
    next();
}

export const logBody = async(req: Request, _res: Response, next: Function) => {
    logger.info(`Request body:`, req.body);
    
    next();
}