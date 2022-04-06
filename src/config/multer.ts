import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import multerS3 from 'multer-s3'
import { resolve } from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'

export const storageTypes = (type: string, folder: string) => {
  if (type === 'local') {
    return multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder),
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        callback(null, fileName)
      }
    })
  } else {
    return multerS3({
      s3: new aws.S3(),
      bucket: process.env.BUCKET_NAME as string,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        callback(null, `${folder}/` + fileName)
      }
    })
  }
}

// export const fileStorage = (folder: string) =>
//   multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', folder),
//     filename: (req, file, callback) => {
//       const fileHash = crypto.randomBytes(10).toString('hex')
//       const fileName = `${fileHash}-${file.originalname}`
//       callback(null, fileName)
//     }
//   })

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  const allowedMimes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'application/pdf'
  ]

  if (allowedMimes.includes(file.mimetype)) {
    return callback(null, true)
  }

  return callback(new Error('Invalid file type.'))
}
