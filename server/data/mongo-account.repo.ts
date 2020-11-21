/**
 * Copyright (c) 2020
 * 
 * Mongo Account Repository interact with Accounts collection in Mongo db
 * 
 * @summary Mongo Account Repository
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
/// <reference path="../interfaces/account.interface.ts" />
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import { logger } from '../services/logger.service';

class MongoAccount {
    private mongo: mongodb.Collection;
    private collectionName: string;

    constructor() {
        dotenv.config();
        this.collectionName = "accounts";
        this.loadAsync();
    }

    private loadAsync = async() => {
        const db = await this.connect();
        this.mongo = db.collection(this.collectionName);
    }

    private connect = async(): Promise<mongodb.Db> => {
        const uri = `mongodb+srv://${process.env.MONGOHOST}`;
        const user = process.env.MONGOUSER + "";
        const pass = process.env.MONGOPASS + "";
        const auth = { user: user, password: pass };
        
        return new Promise((res, rej) => {
            const client = mongodb.MongoClient;
            client.connect(uri, { auth: auth, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                const db = client.db(process.env.MONGODB);
                logger.info(`Successfull connection to MongoDB`);
                return res(db);
            });
        });
    }

    public get = async(id: number): Promise<IAccount[]> => {
        const cursor = this.mongo.find({ account_id: id });
        const results: any[] = [];
        
        await cursor.forEach(function(doc){
            results.push(doc);
        });

        return results;
    }

    public getAll = async(): Promise<IAccount[]> => {
        const cursor = this.mongo.find({});
        const results:any[] = [];
        await cursor.forEach(function(doc){
            results.push(doc);
        })

        return results;
    }

    public add = async(doc: IAccount) => {
        return new Promise((res, rej) => {
            this.mongo.insertOne(doc, function(err, result){
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                res(result);
            })
        });
    }

    public update = async(doc: IAccount) => {
        const query = { account_id: doc.account_id };
        const values = { $set: { limit: doc.limit, products: doc.products }};
        return new Promise((res, rej) => {
            this.mongo.updateOne(query, values, function(err, result){
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                res(result);
            })
        });
    }

    public delete = async(id: number) => {
        return new Promise((res, rej) => {
            this.mongo.deleteOne({ account_id: id }, function(err, result){
                if(err) {
                    logger.error(err);
                    return rej(err.message);
                }
                res(result);
            })
        });
    }
}

export default MongoAccount;
