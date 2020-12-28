import dotenv from 'dotenv';
import kafka, { Consumer } from 'kafka-node';
import KafkaConsumerService from '../services/kafka-consumer.service';
import KafkaClient from './kafka.client';

class KafkaConsumer {
    private kafkaClient: KafkaClient;
    private client: kafka.KafkaClient;
    private consumer: kafka.Consumer;
    private kafkaConsumer: KafkaConsumerService;

    constructor() {
        dotenv.config();
        this.kafkaConsumer = new KafkaConsumerService();
        this.kafkaClient = new KafkaClient("Consumer");
        this.client = this.kafkaClient.get();
        const topics = this.kafkaClient.buildTopics();
        this.consumer = new Consumer(this.client, topics, { autoCommit: false});
    }

    public on = async() => {
        this.consumer.on('message', function(message) {

            console.log(`KafkaConsumer: New message recieved from '${message.topic}'`);

            this.kafkaConsumer.consumeMessage(message);
        })
    }
}

export default KafkaConsumer;