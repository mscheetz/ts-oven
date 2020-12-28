import dotenv from 'dotenv';
import kafka from 'kafka-node';

class KafkaClient {
    private client: kafka.KafkaClient;

    constructor(source: string){
        dotenv.config();
        this.client = new kafka.KafkaClient({ 
            kafkaHost: process.env.KAFKAHOST,
            
            sasl: {
                mechanism: 'SCRAM-SHA-256', 
                username: process.env.KAFKAUSER, 
                password: process.env.KAFKAPASSWORD 
            }
        });

        this.client.on('ready', () => {
            console.log(`KafkaClient: ${source} Successful connection to Kafka.`);
        });
        
        this.client.on('error', (err) => {
            console.error(`KafkaClient: ${source} Error connecting to Kafka.`, err);
        });
        
        this.client.on('reconnect', () => {
            console.error(`KafkaClient: ${source} Successful reconnection to Kafka.`);
        });

        this.createTopics();
    }

    public get(): kafka.KafkaClient {
        return this.client;
    }

    private createTopics = async() => {
        const topics = this.buildTopics();
        return new Promise((res, rej) => {
            this.client.createTopics(topics, function(err, response) {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                console.log(`Successfully created ${topics.length} topic(s)`);
                return res(response);
            })
        });
    }

    public buildTopics() {
        const topicNames = process.env.KAFKATOPICNAMES.split(',');
        let topics = [];
        topicNames.forEach(name => {
            const topicName = `${process.env.KAFKATOPICPRE}${name}`;

            const topic = {
                topic: topicName,
                partition: 1,
                replicationFactor: 2
            }
            topics.push(topic);
        })

        return topics;
    }
}

export default KafkaClient;