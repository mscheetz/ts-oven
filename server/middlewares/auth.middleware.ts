/**
 * Copyright (c) 2020
 * 
 * Auth Middleware intercepts validates requests have valid credentials
 * 
 * @summary AuthMiddleware
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export const jwtCheck = async(req: Request, res: Response, next: Function) => {
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken === 'undefined') {
        res.status(401);
        res.end();
    }
    let token: string = typeof bearerToken === 'undefined' ? "" : bearerToken;
    token = token.substr(7, token.length);

    const authSvc = new AuthService();

    const validToken = await authSvc.validToken(token);

    if(!validToken) {
        res.status(401);
        res.end();
    }

    next();
}