import request from 'request'

const BASE_URL = 'http://localhost:8000'

describe('login', () => {
  test('successful login with user credentials', done => {
    request({
      url: `${BASE_URL}/login`,
      method: 'POST',
      form: { login: 'user', password: 'user' }
    }, (err, res, body) => {
      expect(err).toBeNull() // Check if there has been some connection error
      expect(res.statusCode).toBeLessThan(400)
      if (err || res.statusCode >= 400) {
        done()
        return
      }

      expect(body).toBeTruthy() // Check if token is in the body

      const token = body;

      request({
        url: `${BASE_URL}/authenticated`,
        headers: { Authorization: 'Bearer ' + token }
      }, (err, res) => {
        expect(err).toBeNull() // Check if there has been some connection error
        expect(res.statusCode).toBeLessThan(400) // Check if the user has the correct permissions
        if (err || res.statusCode >= 400) {
          done()
          return
        }

        request({
          url: `${BASE_URL}/admin-secured`,
          headers: { Authorization: 'Bearer ' + token }
        }, (err, res) => {
          expect(err).toBeNull() // Check if there has been some connection error
          expect(res.statusCode).toBe(401) // Check if the user has the correct permissions
          done()
        })
      })
    })
  })

  test('successful login with admin credentials', done => {
    request({
      url: `${BASE_URL}/login`,
      method: 'POST',
      form: { login: 'admin', password: 'admin' }
    }, (err, res, body) => {
      expect(err).toBeNull() // Check if there has been some connection error
      expect(res.statusCode).toBeLessThan(400)
      if (err || res.statusCode >= 400) {
        done()
        return
      }

      expect(body).toBeTruthy() // Check if token is in the body

      const token = body;

      request({
        url: `${BASE_URL}/authenticated`,
        headers: { Authorization: 'Bearer ' + token }
      }, (err, res) => {
        expect(err).toBeNull() // Check if there has been some connection error
        expect(res.statusCode).toBeLessThan(400) // Check if the user has the correct permissions
        if (err || res.statusCode >= 400) {
          done()
          return
        }

        request({
          url: `${BASE_URL}/admin-secured`,
          headers: { Authorization: 'Bearer ' + token }
        }, (err, res) => {
          expect(err).toBeNull() // Check if there has been some connection error
          expect(res.statusCode).toBeLessThan(400) // Check if the user has the correct permissions
          done()
        })
      })
    })
  })
})
