const PromiseQueue = require('p-queue')
const delay = require('delay')
const getChannel = require('./getChannel')
const queue = new PromiseQueue.default({ concurrency: 5 })

async function connect() {
  try {
    const channel = await getChannel()
    await channel.assertQueue("jobs");

    channel.consume("jobs", msg => {
      const { wait, message } = JSON.parse(msg.content.toString());

      queue.add(async () => {
        console.log(message)
        await delay(wait)
        channel.ack(msg)
        console.log('Finish job', queue.pending, wait)
      })
      console.log(`Recieved job with input ${JSON.stringify({ wait, message })}`)
    })

    console.log("Waiting for messages...")
  }
  catch (ex) {
    console.error(ex)
  }
}

connect();
