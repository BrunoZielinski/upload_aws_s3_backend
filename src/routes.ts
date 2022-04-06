import { Router, Request, Response } from 'express'
import multer from 'multer'

// --- CONTROLLERS UPLOAD ---
import { CreateUploadController } from './controllers/upload/CreateUploadController'
import { ListUploadController } from './controllers/upload/ListUploadController'
import { DeleteUploadController } from './controllers/upload/DeleteUploadController'

// --- CONTROLLERS EMAIL ---
import { SendEmailController } from './controllers/email/SendEmailController'

// --- SERVICES UPLOAD ---
import { storageTypes, fileFilter } from './config/multer'

const router = Router()

// --- CONNECTION TEST ---
router.get('/ping', (req: Request, res: Response) => {
  return res.json({ pong: true })
})

// --- ROUTERS UPLOAD ---
router.get('/uploads', new ListUploadController().handle)
router.post(
  '/uploads',
  multer({
    storage: storageTypes(
      process.env.STORAGE_TYPE === 'local' ? 'local' : 's3',
      'uploads'
    ),
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
  }).single('file'),
  new CreateUploadController().handle
)
router.delete('/upload/remove', new DeleteUploadController().handle)

// --- ROUTERS EMAIL ---
router.post('/email/send', new SendEmailController().handle)

export { router }
