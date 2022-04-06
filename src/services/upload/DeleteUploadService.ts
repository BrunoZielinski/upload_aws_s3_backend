import prismaClient from '../../prisma'
import { resolve } from 'path'
import aws from 'aws-sdk'
import fs from 'fs'

const s3 = new aws.S3()

interface iUploadRequest {
  uploadId: string
}

class DeleteUploadService {
  async execute({ uploadId }: iUploadRequest) {
    const upload = await prismaClient.photo.delete({
      where: {
        id: uploadId
      }
    })

    if (process.env.STORAGE_TYPE === 's3') {
      const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: upload.key
      }
      s3.deleteObject(params, (err, data) => {})
    } else {
      const filePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        upload.key
      )

      fs.unlink(filePath, err => {})
    }

    return upload
  }
}

export { DeleteUploadService }
