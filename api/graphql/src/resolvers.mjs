import { filterSingleUser } from '../../shared/filters.mjs'

// Models
import User from '../../shared/models/User.mjs'

function getUser(id) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ where: { id } })
      .then(item => {
        const filtered = filterSingleUser(item)
        resolve(filtered)
      })
      .catch(err => reject({ id: 39, data: err }))
  })
}

export default {
  Query: {
    user: (parent, args) => getUser(args.id)
  }
}
