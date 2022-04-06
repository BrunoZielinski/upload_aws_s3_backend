import { Request, Response } from 'express'
import { DeleteUploadService } from '../../services/upload/DeleteUploadService'

class DeleteUploadController {
  async handle(req: Request, res: Response) {
    const uploadId = req.query.uploadId as string

    const service = new DeleteUploadService()
    const upload = await service.execute({ uploadId })

    return res.json(upload)
  }
}

export { DeleteUploadController }
