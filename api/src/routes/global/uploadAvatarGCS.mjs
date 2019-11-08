// Dependencies
import Multer from 'multer'
import uuidv4 from 'uuid/v4.js'

import GCS from '@google-cloud/storage'
const storage = new GCS.Storage()
const bucket = storage.bucket(config.gc.s.bucket)

import multer from 'multer'
const upload = multer({
  storage: Multer.memoryStorage(),
  // fileFilter: (req, file, cb) => {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     return cb(new Error('Only image files are allowed!'), false)
  //   }

  //   cb(null, true)
  // }
}).single('avatar')

// Other
import config from '../../config.mjs'

export default function uploadAvatarGCSRoute(req, res) {
  upload(req, res, err => {
    const mimeTypes = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
    }

    const filePath = `avatars/original/${uuidv4()}.${mimeTypes[req.file.mimetype]}`

    const blob = bucket.file(filePath)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', err => {
      console.error(err)
      res
        .status(500)
        .end()
    })

    blobStream.on('finish', () => {
      res.end()
    })

    blobStream.end(req.file.buffer)
  })
}
