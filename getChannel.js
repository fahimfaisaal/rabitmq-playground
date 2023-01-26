const amqp = require("amqplib");

const getChannel = async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  return connection.createChannel()
}

module.exports = getChannel
