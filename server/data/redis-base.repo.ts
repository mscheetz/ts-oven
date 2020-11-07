/**
 * Copyright (c) 2020
 * 
 * Redis Base Repository interact redis database
 * 
 * @summary Redis Base Repository
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import redis from 'redis';
import dotenv from 'dotenv';

class RedisBaseRepo {
    private client: redis.RedisClient;

    constructor() {
        dotenv.config();
        const port: number = +process.env.REDISPORT!;
        this.client = redis.createClient(port, process.env.REDISHOST);
        this.client.auth(process.env.REDISSECRET+"");
    }
    
    public getMany = async(keys: string[]): Promise<any> => {       
        return new Promise((res, rej) => {
            this.client.mget(keys, (err, values) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(values);
            });
        });
    }

    public getString = async(key: string): Promise<any> => {        
        return new Promise((res, rej) => {
            this.client.get(key, (err, value) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(value);
            });
        });
    }
    
    public getObject = async(key: string): Promise<any> => {     
        return new Promise((res, rej) => {
            this.client.hgetall(key, (err, value) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(value);
            });
        });
    }
    
    public getList = async(key: string): Promise<string[]> => {     
        return new Promise((res, rej) => {
            this.client.lrange(key, 0, -1, (err, values) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(values);
            });
        });
    }
    
    public getKeys = async(pattern: string = "*"): Promise<string[]> => {     
        return new Promise((res, rej) => {
            this.client.keys(pattern, (err, keys) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(keys);
            });
        });
    }

    public addString = async(key: string, value: string, expiry?: number): Promise<any> => { 
        return new Promise((res, rej) => {
            this.client.set(key, value, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                if(expiry) {
                    this.client.expire(key, expiry);
                }
                res(response);
            });
        });
    }

    public addObject = async(key: string, value: any, expiry?: number): Promise<any> => { 
        return new Promise((res, rej) => {
            this.client.hmset(key, value, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                if(expiry) {
                    this.client.expire(key, expiry);
                }
                res(response);
            });
        });
    }

    public addList = async(key: string, values: string[], expiry?: number): Promise<any> => {
        return new Promise((res, rej) => {
            this.client.rpush(key, values, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                if(expiry) {
                    this.client.expire(key, expiry);
                }
                res(response);
            });
        });
    }

    public delete = async(key: string): Promise<any> => {
        return new Promise((res, rej) => {
            this.client.del(key, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(response);
            });
        });
    }
    
    public update = async(key: string, value: any) => {   
        return new Promise((res, rej) => {
            this.client.set(key, value, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(response);
            });
        });
    }

    public rename = async(key: string, newKey: string): Promise<string> => {     
        return new Promise((res, rej) => {
            this.client.rename(key, newKey, (err, response) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(response);
            });
        });
    }
}

export default RedisBaseRepo;
