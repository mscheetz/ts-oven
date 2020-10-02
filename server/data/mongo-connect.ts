// from https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
import * as Mongoose from 'mongoose';

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
        console.log("Connected to MongoDB");
    });

    db.on("error", () => {
        console.error("Error connecting to MongoDB");
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