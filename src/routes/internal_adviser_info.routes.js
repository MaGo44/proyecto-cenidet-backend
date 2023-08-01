import {Router} from 'express'
import { getInternalAdviserInfo, getInternalAdvisersInfo, postInternalAdviserInfo, putInternalAdviserInfo, deleteStudentInfo } from '../controllers/internal_adviser_info.controller.js'

const router = Router()

router.get('/internal_adviser_info', getInternalAdvisersInfo)
router.get('/internal_adviser_info/:id', getInternalAdviserInfo)
router.post('/internal_adviser_info', postInternalAdviserInfo)
router.patch('/internal_adviser_info/:id', putInternalAdviserInfo)
router.delete('/internal_adviser_info/:id', deleteStudentInfo)

export default router