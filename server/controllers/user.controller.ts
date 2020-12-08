/**
 * Copyright (c) 2020
 * 
 * User Controller handle requests for modifying user account
 * 
 * @summary User controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import express from 'express';
import AuthService from '../services/auth.service';
import EncryptionService from '../services/encryption.service';

class UserController {
    constructor() { }

    static addUser = async(req: express.Request, res: express.Response) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if(typeof username === 'undefined' || typeof password === 'undefined') {
            const message = "Request not formatted correctly";
            
            res.status(400).send(message);
            res.end();
        }
        const authSvc = new AuthService();

        if(!authSvc.validateEmail(email)) {
            const message = "Invalid email address";
            
            res.status(400).send(message);
            res.end();
        }

        const hash = await EncryptionService.hashPassword(password);
        const userId = authSvc.getUuid();

        const user: IUser = { id: userId, username: username, email: email, password: hash };

        // Add user to db

        res.status(201).json(`User created`);
    }

    static updatePassword = async(req: express.Request, res: express.Response) => {
        const userId = req.body.userId;
        const password = req.body.password;
        const newPassword = req.body.newPassword;

        if(typeof userId === 'undefined' || typeof password === 'undefined' || typeof newPassword === 'undefined') {
            const message = "Request not formatted correctly";
            
            res.status(400).send(message);
            res.end();
        }

        // Get user from database, not local method
        const user = await UserController.getUser(userId);

        if(user === null || !EncryptionService.checkPassword(password, user.password)) {
            res.status(400).json('Invalid username or password');
            res.end();
        }

        const hash = await EncryptionService.hashPassword(newPassword);

        user.password = hash;

        // Update user in db

        res.status(200).json('Password updated');
    }

    static getUser = async(userId: string): Promise<IUser> => {
        const user: IUser = { id: userId, username: 'username', email: `email`, password: `hash` };

        return user;
    }
}

export default UserController;