/**
 * Copyright (c) 2020
 * 
 * Login Controller handles login to retrieve a jwt
 * 
 * @summary Login Controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
/// <reference path="../interfaces/user.interface.ts" />
import express from 'express';
import { LogLevel } from '../interfaces/enums';
import AuthService from '../services/auth.service';
import LogService from '../services/log.service';
import EncryptionService from '../services/encryption.service';

class LoginController {
    constructor() { }

    static guestLogin = async(req: express.Request, res: express.Response) => {
        LogService.writeLog(LogLevel.INFO, `incoming from ${req.ip}`);
        const authSvc = new AuthService();

        const userToken = {
            userId: 'guest'
        };

        const jwt = await authSvc.getToken(userToken);

        res.set('Authorization', `Bearer ${jwt}`);
        res.status(200).send(jwt);
    }

    static login = async(req: express.Request, res: express.Response) => {
        const userId = req.body.username;
        const password = req.body.password;

        if(typeof userId === 'undefined' || typeof password === 'undefined') {
            const message = "Credentials not formatted correctly";
            
            res.status(400).send(message);
            res.end();
        }

        // Get user from db
        const user = await LoginController.getUser(userId);

        if(user === null || !EncryptionService.checkPassword(password, user.password)) {
            res.status(400).json('Invalid username or password');
            res.end();
        }

        const authSvc = new AuthService();
        const userToken = {
            userId: userId
        };

        const jwt = await authSvc.getToken(userToken);

        res.set('Authorization', `Bearer ${jwt}`);
        res.status(200).send(jwt);
    }

    static getUser = async(userId: string): Promise<IUser> => {
        const user: IUser = { id: userId, username: 'username', email: `email`, password: `hash` };

        return user;
    }
}

export default LoginController;