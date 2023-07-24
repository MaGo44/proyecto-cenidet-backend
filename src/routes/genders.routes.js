import {Router} from 'express'
import { getGenders} from '../controllers/genders.controller.js'

const router = Router()

router.get('/genders', getGenders)

export default router