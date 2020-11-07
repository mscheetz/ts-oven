/**
 * Copyright (c) 2020
 * 
 * Core Service holds universal methods for application
 * 
 * @summary Core Service
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import fs from 'fs';

class CoreService {
    static readFile = async(path: string): Promise<string> => {
        return new Promise((res, rej) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(data);
            });
        });
    }
}

export default CoreService;