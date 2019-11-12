export default function error(err, res) {
  if (err.id === 1) {
    res
      .status(400)
      .json({ error: { id: err.id, msg: 'E-mail address or password missing.' } })
  } else if (err.id === 2) {
    res
      .status(401)
      .json({ error: { id: err.id, msg: 'E-mail address or password wrong.' } })
  } else if (err.id === 3) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 4) {
    res
      .status(403)
      .json({ error: { id: err.id, msg: 'E-mail address is not yet verified.' } })
  } else if (err.id === 5) {
    res
      .status(403)
      .json({ error: { id: err.id, msg: 'Permission required.' } })
  } else if (err.id === 6) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 7) {
    res
      .status(401)
      .end()
  } else if (err.id === 8) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 9) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 10) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 11) {
    res
      .status(403)
      .end()
  } else if (err.id === 12) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 13) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 14) {
    res
      .status(403)
      .end()
  } else if (err.id === 15) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 16) {
    res
      .status(401)
      .send('No or invalid token for authorization found.')
  } else if (err.id === 17) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 18) {
    res
      .status(400)
      .json({ error: { id: 3, msg: 'E-mail address or password missing.' } })
  } else if (err.id === 19) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 20) {
    res
      .status(400)
      .json({ error: { id: 4, msg: 'Login already in use.' } }) // TODO: This message is a security issue (information disclosure)
  } else if (err.id === 21) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 22) {
    res
      .status(404) // TODO: This response is a security issue (information disclosure)
      .end()
  } else if (err.id === 23) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 24) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 25) {
    res
      .status(403)
      .json({ error: {id: 5, msg: 'Permission required.'} })
  } else if (err.id === 26) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 27) {
    console.trace(err)
    res
      .status(500)
      .end()
  } else if (err.id === 100 || err.id === 101) {
    console.trace(err)
    res
      .status(500)
      .end()
  }
}
