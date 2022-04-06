import { Request, Response } from 'express'
import { ListUploadService } from '../../services/upload/ListUploadService'

class ListUploadController {
  async handle(req: Request, res: Response) {
    const service = new ListUploadService()
    const upload = await service.execute()

    return res.json(upload)
  }
}

export { ListUploadController }
