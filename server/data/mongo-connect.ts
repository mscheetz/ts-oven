/**
 * Copyright (c) 2020
 * 
 * Mongo Connect handle connection to mongo db
 * 
 * @summary Mongo Connect
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
// from https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
import * as Mongoose from 'mongoose';
import { logger } from '../services/logger.service';

let db: Mongoose.Connection;

const mongoConnect = () => {    
    const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGOHOST}/${process.env.MONGODB}?retryWrites=true&w=majority`;

    if(db) {
        return;
    }

    Mongoose.connect(uri, { 
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    db = Mongoose.connection;

    db.once("open", async() => {
        logger.info("Connected to MongoDB");
    });

    db.on("error", () => {
        logger.error("Error connecting to MongoDB");
    });
}

const mongoDisconnect = () => {
    if(!db) {
        return;
    }

    Mongoose.disconnect();
}

export { 
    mongoConnect,
    mongoDisconnect 
};