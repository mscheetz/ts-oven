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
import LogService from "../services/log.service"
import { LogLevel } from "../interfaces/enums";

export const logUrl = async(req: Request, _res: Response, next: Function) => {
    LogService.writeLog(LogLevel.INFO, `New request to: '${req.url}'`);
    
    next();
}

export const logType = async(req: Request, _res: Response, next: Function) => {
    LogService.writeLog(LogLevel.INFO, `Request type:`, req.method);
    
    next();
}

export const logHeaders = async(req: Request, _res: Response, next: Function) => {
    LogService.writeLog(LogLevel.INFO, `Request headers:`, req.headers); 
    
    next();
}

export const logBody = async(req: Request, _res: Response, next: Function) => {
    LogService.writeLog(LogLevel.INFO, `Request body:`, req.body);
    
    next();
}