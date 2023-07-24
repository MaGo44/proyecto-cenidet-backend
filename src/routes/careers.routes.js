import {Router} from 'express'
import { getCareers} from '../controllers/careers.controller.js'

const router = Router()

router.get('/careers', getCareers)

export default router