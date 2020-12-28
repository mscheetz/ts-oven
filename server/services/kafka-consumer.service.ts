import kafka from 'kafka-node';

class KafkaConsumerService {
    constructor() {}

    public consumeMessage = async(message: kafka.Message) => {
        console.log(`KafkaConsumerService: Message received from ${message.topic}`);
    }
}

export default KafkaConsumerService;