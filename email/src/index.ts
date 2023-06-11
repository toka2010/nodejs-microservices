import { EachMessagePayload, Kafka } from "kafkajs";
import { createTransport } from "nodemailer";

const kafka = new Kafka({
  clientId: "email-consumer",
  brokers: ["pkc-4r297.europe-west1.gcp.confluent.cloud:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: "HF2LRYVRS26OHMIR",
    password:
      "clUC7iHVrNBJUgT932h+2eZXXIM4pDKsFMStUGlFN1w6PXbiGdx7WBv5mjpuN3SJ",
  },
});

const consumer = kafka.consumer({ groupId: "email-consumer" });
const transporter = createTransport({
  host: 'host.docker.internal',
  port: 1025,
});
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "default" });
  await consumer.run({
    eachMessage: async (message: EachMessagePayload) => {
      console.log(
        "🚀 ~ file: index.ts:21 ~ eachMessage: ~ message:",
        JSON.parse(message.message.value.toString())
      );
      const order = JSON.parse(message.message.value.toString());
      console.log("🚀 ~ file: index.ts:31 ~ eachMessage: ~ order:", order.orderid)

      await transporter.sendMail({
        from: "toka.fawy@gmail.com",
        to: "toka.fawy@gmail.com",
        subject: "An order has been completed",
        text: `Order #${order.orderid} with a total of  has been completed`,
      });

      // await transporter.sendMail({
      //   from: "toka.fawy@gmail.com",
      //   to: "toka.fawy@gmail.com",
      //   subject: "An order has been completed",
      //   html: `You earned from the link #${order.address.zipcode}`,
      // });
    },
  });
  // await transporter.close();
};
 
// run().then(console.error);

run().catch(console.error)

