const amqp = require("amqplib");


connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", message => {

      const input = JSON.parse(message.content.toString());
      console.log(` Recieve jpb with input ${input.number}`);
      // "7" === 7; fasle
      // "7" ==7; true
      if (input.number == 7) {
        channel.ack(message)
      }
    })

    console.log("Waitting for messages...")
  } catch (ex) {
    console.error(ex)
  }
}