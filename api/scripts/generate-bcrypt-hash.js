if (!process.env.PASS || !process.env.ROUNDS) {
  console.error('PASS or ROUNDS missing.')
  return
}

const bcrypt = require('bcrypt')

bcrypt
  .hash(process.env.PASS, parseInt(process.env.ROUNDS))
  .then((hash) => {
    console.log(hash)
  })
