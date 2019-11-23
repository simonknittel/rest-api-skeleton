export default function error(err, res) {
  let status = null
  const json = {}

  if ([3, 6, 8, 9, 10, 12, 13, 15, 19, 21, 23, 24, 26, 28, 33, 34, 100, 101].indexOf(err.id) >= 0) {
    console.trace(err)
    status = 500
  } else if ([5, 11, 14, 25, 27, 29, 31].indexOf(err.id) >= 0) {
    status = 403
  } else if (err.id === 1) {
    status = 400
    json.msg = 'E-mail address or password missing.'
  } else if (err.id === 2) {
    status = 401
    json.msg = 'E-mail address or password wrong.'
  } else if (err.id === 4) {
    status = 403
    json.msg = 'E-mail address is not yet verified.'
  } else if (err.id === 7) {
    status = 404
  } else if (err.id === 18) {
    status = 400
    json.msg = 'E-mail address or password missing.'
  } else if (err.id === 20) {
    status = 400
    json.msg = 'Login already in use.' // TODO: This message is a security issue (information disclosure)
  } else if (err.id === 22) {
    status = 404 // TODO: This response is a security issue (information disclosure)
  } else if (err.id === 30) {
    status = 400
  } else if (err.id === 32) {
    status = 400
  }

  res
    .status(status)
    .json({ error: { id: err.id, ...json}})
}
