import amqp from 'amqplib'
import sharp from 'sharp'

import GCS from '@google-cloud/storage'
const storage = new GCS.Storage()
const bucket = storage.bucket(config.gc.s.bucket)

const queue = 'image_queue'
const open = amqp.connect('amqp://message_queue')

open
  .then(connection => connection.createChannel())
  .then(channel => {
    return channel.assertQueue(queue).then(ok => {
      channel.prefetch(10)
      channel.consume(queue, msg => {
        retrieveFromStorage()
          .then(process)
          .then(() => {
            channel.ack(msg)
          })
          .catch(() => {
            channel.nack(msg)
          })
      })
    })
  })
  .catch(error => { throw error })

function retrieveFromStorage() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

function process() {
  return new Promise((resolve, reject) => {
    sharp(inputBuffer)
      .resize(320, 240)
      .toFile('output.webp', (err, info) => {
        //
      })
  })
}
