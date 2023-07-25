import {Router} from 'express'
import { getPeriods} from '../controllers/periods.controller.js'

const router = Router()

router.get('/periods', getPeriods)

export default router