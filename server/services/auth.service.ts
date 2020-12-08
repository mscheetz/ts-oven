/**
 * Copyright (c) 2020
 * 
 * Authentication Service manages authentication for application
 * 
 * @summary Auth Service
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
import * as jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { logger } from './logger.service';

class AuthService {
    private tokenSecret: string;

    constructor() {
        this.tokenSecret = process.env.TOKEN_SECRET!;
    }

    public getToken = async(payload: any): Promise<string> => {
        try {
            const oneDay = 60 * 60 * 24;
            const token = jwt.sign(payload, this.tokenSecret);

            return token;
        } catch(err) {
            logger.error(err);
            return 'error';
        }
    }

    public validToken = async(token: string): Promise<boolean> => {
        let validity = false;
        let payload: string = "";
        try {
            payload = jwt.verify(token, this.tokenSecret).toString();            
        } catch(err) {
            logger.error(err);
        }
        if(payload === 'guest') {
            validity = true;
        }
        return validity;
    }

    public validateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public getUuid() {
        return uuid.v4();
    }
}

export default AuthService;