import amqp from 'amqplib';
import PaymentModelContract from './PaymentModelContract';
import { getCheckoutInstance } from '../../gateways/index';

class Queue {
  constructor() {
    this.channel = null;
    this.connection = null;
  }

  async connectQueue() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_HOST_URL);
      this.channel = await this.connection.createChannel();
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }

  async subscribe() {
    /**
     * Work approuch
     */
    try {
      const queueName = process.env.RABBITMQ_PAYMENT_QUEUE;
      this.channel.prefetch(1);

      await this.channel.assertQueue(queueName, {
        durable: true
      });

      await this.channel.consume(queueName, async msg => {
        if (msg !== null) {
          const model = PaymentModelContract.parse(msg.content.toString());

          const checkout = getCheckoutInstance(model.gateway);

          const response = await checkout.doCheckoutRequest(model);

          console.log(response);

          this.channel.assertExchange('payment_status_changed', 'fanout', {
            durable: false
          });

          this.channel.publish(
            'payment_status_changed',
            '',
            Buffer.from(JSON.stringify(response))
          );

          console.log(' [x] Sent %s', response);

          if (response.status === 'APPROVED') {
            // REMOVE FROM STOCK
          }

          // UPDATE ORDER WITH STATUS
          this.channel.ack(msg); // remove from queue
        }
      });
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }

  closeConnection() {
    try {
      setTimeout(async () => {
        await this.channel.close();
        await this.connection.close();
      }, 500);
    } catch (e) {
      /**
       * @todo
       * send a alert
       */
      console.error(e);
    }
  }
}
export default new Queue();
