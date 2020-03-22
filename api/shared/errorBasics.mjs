export default function errorBasics(err) {
  let id = err.id
  let status = 0
  let msg = ''

  if ([3, 6, 8, 9, 10, 12, 13, 15, 19, 21, 23, 24, 26, 28, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 100, 101].indexOf(id) >= 0) {
    console.trace(err)
    status = 500
  } else if ([5, 11, 14, 25, 27, 29, 31].indexOf(id) >= 0) {
    status = 403
  } else if (id === 1) {
    status = 400
    msg = 'E-mail address or password missing.'
  } else if (id === 2) {
    status = 401
    msg = 'E-mail address or password wrong.'
  } else if (id === 4) {
    status = 403
    msg = 'E-mail address is not yet verified.'
  } else if (id === 7) {
    status = 404
  } else if (id === 18) {
    status = 400
    msg = 'E-mail address or password missing.'
  } else if (id === 20) {
    status = 400
    msg = 'Login already in use.' // TODO: This message is a security issue (information disclosure)
  } else if (id === 22) {
    status = 404 // TODO: This response is a security issue (information disclosure)
  } else if (id === 30) {
    status = 400
  } else if (id === 32) {
    status = 400
  }

  return { id, status, msg }
}
