import { EachMessagePayload, Kafka } from "kafkajs";
// import { createTransport } from "nodemailer";

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

const producer = kafka.producer();

const run = async () => {
  // Producing
  const value =JSON.stringify({
    orderid: 20,
    itemid: "Item_111",
    address: {
      city: "ismailia",
      state: "CA",
      zipcode: 94041,
    },
  },)
  await producer.connect();
  await producer.send({
    topic: "default",
    messages: [
      {
        value
      },
    ],
  });
};

run().then(console.error);