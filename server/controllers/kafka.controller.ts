import KafkaProducer from '../data/kafka-producer.repo';
import dotenv from 'dotenv';
import express from 'express';

class KafkaController {
    private producer: KafkaProducer;

    constructor() {
        dotenv.config();
        this.producer = new KafkaProducer();
    }

    public postTest = async(req: express.Request, res: express.Response) => {
        let topic = req.body.topic;
        const message = req.body.message;

        topic = `${process.env.KAFKATOPICPRE}${topic}`;

        const response = await this.producer.publish(topic, message);

        res.json(response);
    }

    public postTester = async(req: express.Request, res: express.Response) => {
        let topic = req.body.topic;
        const message = req.body.message;

        topic = `${process.env.KAFKATOPICPRE}${topic}`;

        const response = await this.producer.publish(topic, message);

        res.json(response);
    }
}

export default KafkaController;