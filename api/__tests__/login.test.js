import got from 'got'

const BASE_URL = 'http://localhost:8000'

describe('login', () => {
  test('successful login with user credentials', done => {
    got(`${BASE_URL}/login`, {
      method: 'POST',
      form: { login: 'hallo2@simonknittel.de', password: '12345' }
    })
      .then(({ body, statusCode }) => {
        expect(statusCode).toBeLessThan(400)
        if (statusCode >= 400) throw new Error('statusCode >= 400')

        expect(body).toBeTruthy() // Check if token is in the body
        if (!body) throw new Error('body is not truthy')

        return got(`${BASE_URL}/authenticated`, {
          headers: { Authorization: 'Bearer ' + body }
        })
      })
      .then(({ statusCode }) => {
        expect(statusCode).toBeLessThan(400) // Check if the user has the correct permissions
        if (statusCode >= 400) throw new Error('statusCode >= 400')

        return got(`${BASE_URL}/admin-secured`, {
          headers: { Authorization: 'Bearer ' + token }
        })
      })
      .then(({ statusCode }) => {
        expect(statusCode).toBe(401) // Check if the user has the correct permissions
        if (statusCode !== 401) throw new Error('statusCode !== 401')

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('successful login with admin credentials', done => {
    got(`${BASE_URL}/login`, {
      method: 'POST',
      form: { login: 'admin', password: 'admin' }
    })
      .then(({ body, statusCode }) => {
        expect(statusCode).toBeLessThan(400)
        if (statusCode >= 400) throw new Error('statusCode >= 400')

        expect(body).toBeTruthy() // Check if token is in the body
        if (!body) throw new Error('body is not truthy')

        return got(`${BASE_URL}/authenticated`, {
          headers: { Authorization: 'Bearer ' + body }
        })
      })
      .then(({ statusCode }) => {
        expect(statusCode).toBeLessThan(400) // Check if the user has the correct permissions
        if (statusCode >= 400) throw new Error('statusCode >= 400')

        return got(`${BASE_URL}/admin-secured`, {
          headers: { Authorization: 'Bearer ' + token }
        })
      })
      .then(({ statusCode }) => {
        expect(statusCode).toBeLessThan(400) // Check if the user has the correct permissions
        if (statusCode >= 400) throw new Error('statusCode >= 400')

        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
