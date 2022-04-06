import prismaClient from '../../prisma'

interface iUploadRequest {
  name: string
  key: string
  url: string
  size: number
}

class CreateUploadService {
  async execute({ name, key, url, size }: iUploadRequest) {
    const upload = await prismaClient.photo.create({
      data: {
        name,
        key,
        url,
        size
      }
    })

    return upload
  }
}

export { CreateUploadService }
