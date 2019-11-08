import https from 'https'
import querystring from 'querystring'

import config from '../config.mjs'

export default class Email {
  constructor(to, subject, html) {
    this.to = to
    this.subject = subject
    this.html = html
  }

  send() {
    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.eu.mailgun.net',
        path: `/v3/${config.mailgun.domain}/messages`,
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`api:${config.mailgun.key}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }, (res) => {
        let responseBody = ''
        res.on('data', d => responseBody += d)

        res.on('end', () => {
          if (res.statusCode >= 400) return reject({ type: 100, data: responseBody })
          resolve()
        })
      })

      let failure = false
      req.on('error', err => { failure = err })

      req.write(querystring.stringify({
        from: config.mailgun.from,
        to: this.to,
        subject: this.subject,
        html: this.html,
      }))

      req.end()

      if (failure) return reject({ type: 101, data: failure })
    })
  }
}
