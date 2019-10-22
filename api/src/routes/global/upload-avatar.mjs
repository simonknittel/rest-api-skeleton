// Dependencies
import fs from 'fs'

import cloudinaryV1 from 'cloudinary'
const cloudinary = cloudinaryV1.v2

import multer from 'multer'
const upload = multer({
  dest: config.uploads.avatars.localTmp,
  // fileFilter: (req, file, cb) => {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     return cb(new Error('Only image files are allowed!'), false)
  //   }

  //   cb(null, true)
  // }
}).single('avatar')

// Other
import config from '../../config.mjs'

export default function uploadAvatarRoute(req, res) {
  upload(req, res, err => {
    const mimeTypes = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
    }

    let filePath = req.file.path
    filePath += '.' + mimeTypes[req.file.mimetype]

    // Rename the file to be able to upload it to Cloudinary
    fs.rename(req.file.path, filePath, (err) => {
      if (err)  {
        console.error(err.data)
        return res
          .status(500)
          .end()
      }

      uploadAvatar(filePath)
        .then(url => res.json({ url }))
        .catch((err) => {
          if (err.type === 1) {
            res
              .status(400)
              .json({ error: {id: 1, msg: ''} })
          } else if (err.type === 2) {
            console.error(err.data)
            res
              .status(500)
              .end()
          }
        })
    })
  })
}

function uploadAvatar(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: config.uploads.avatars.cloudinaryFolder },
      (err, result) => {
        if (err) return reject({ type: 2, data: err })

        // TODO: Clean up localTmp directory

        resolve(result.secure_url)
      },
    )
  })
}
