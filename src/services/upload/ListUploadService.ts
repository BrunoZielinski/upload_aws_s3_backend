import prismaClient from '../../prisma'

class ListUploadService {
  async execute() {
    const upload = await prismaClient.photo.findMany({
      select: {
        id: true,
        name: true,
        key: true,
        url: true,
        size: true
      }
    })

    return upload
  }
}

export { ListUploadService }
