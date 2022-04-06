import { Request, Response } from 'express'
import { CreateUploadService } from '../../services/upload/CreateUploadService'

class CreateUploadController {
  async handle(req: Request, res: Response) {
    if (!req.file) {
      throw new Error('Missing file')
    } else {
      if (process.env.STORAGE_TYPE === 'local') {
        const { originalname: name, filename: key, size } = req.file

        const service = new CreateUploadService()

        const upload = await service.execute({
          name,
          key,
          url: `${process.env.APP_URL}:${
            process.env.SERVER_PORT || process.env.PORT
          }/uploads/${key}`,
          size
        })

        return res.json(upload)
      } else {
        const { originalname: name, key, location: url, size } = req.file

        const service = new CreateUploadService()

        const upload = await service.execute({
          name,
          key,
          url,
          size
        })

        return res.json(upload)
      }
    }
  }
}

export { CreateUploadController }
