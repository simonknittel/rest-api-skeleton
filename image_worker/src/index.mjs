import amqp from 'amqplib'

const queue = 'image_queue'
const open = amqp.connect('amqp://message_queue')

open
  .then(connection => connection.createChannel())
  .then(channel => {
    return channel.assertQueue(queue).then(ok => {
      channel.prefetch(10)
      channel.consume(queue, msg => {
        channel.ack(msg)
      })
    })
  })
  .catch(error => { throw error })
