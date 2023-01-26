const cron = require('node-cron')
const getChannel = require('./getChannel')

async function publish() {
  try {
    const channel = await getChannel()
    await channel.assertQueue('jobs');
    const randNumber = Math.floor(Math.random() * 10e3 + 1e3)

    channel.sendToQueue('jobs', Buffer.from(JSON.stringify({
      wait: randNumber,
      message: `Waiting ${randNumber / 1000}s`
    })))

    console.log(`Job sent successfully, will wait ${randNumber}ms`);
  } catch (e) {
    console.log(e)
  }
}

cron.schedule('*/1 * * * * *', publish)
