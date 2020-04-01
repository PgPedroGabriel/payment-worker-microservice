import amqp from 'amqplib';
import PaymentModelContract from './PaymentModelContract';
import { getCheckoutInstance } from '../../gateways/index';

class Queue {
  constructor() {
    this.channel = null;
    this.connection = null;
  }

  async connectQueue() {
    this.connection = await amqp.connect(process.env.RABBITMQ_HOST_URL);
    this.channel = await this.connection.createChannel();
  }

  async subscribe() {
    /**
     * Work approuch
     */
    const queueName = process.env.RABBITMQ_PAYMENT_QUEUE;
    this.channel.prefetch(1);

    await this.channel.assertQueue(queueName, {
      durable: true
    });

    await this.channel.consume(queueName, async msg => {
      if (msg !== null) {
        const model = PaymentModelContract.parse(msg.content.toString());

        const checkoutInstance = getCheckoutInstance(model.gateway);

        const data = await checkoutInstance.doCheckoutRequest(model);

        this.channel.assertExchange('payment_status_changed', 'fanout', {
          durable: false
        });

        this.channel.publish(
          'payment_status_changed',
          '',
          Buffer.from(JSON.stringify(data))
        );

        this.channel.ack(msg); // remove from queue
      }
    });
  }

  closeConnection() {
    setTimeout(async () => {
      await this.channel.close();
      await this.connection.close();
    }, 500);
  }
}
export default new Queue();
