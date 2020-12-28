import dotenv from 'dotenv';
import kafka, { Producer } from 'kafka-node';
import KafkaClient from './kafka.client';

class KafkaProducer {
    private kafkaClient: KafkaClient;
    private client: kafka.KafkaClient;
    private producer: kafka.Producer;

    constructor(){
        dotenv.config();
        this.kafkaClient = new KafkaClient("Producer");
        this.client = this.kafkaClient.get();
        this.producer = new Producer(this.client);
    }

    public publish = async(topicName: string, message: any) => {
        const payload = {
            topic: topicName,
            messages: message
        };
        return new Promise((res, rej) => {
            this.producer.on('ready', function() {
                this.send(payload, function(err, data){
                    if(err){
                        console.error(err);
                        return rej(err.message);
                    }
                    console.log(`Successful publish to ${topicName}`);
                    console.log(data);
                    return res(data);
                })
            })
        });
    }
}

export default KafkaProducer;