import {Router} from 'express'
import { getStudentInfo, getStudentsInfo, postStudentInfo,putStudentInfo, deleteStudentInfo } from '../controllers/student_info.controller.js'

const router = Router()

router.get('/student_info', getStudentsInfo)
router.get('/student_info/:id', getStudentInfo)
router.post('/student_info', postStudentInfo)
router.patch('/student_info/:id', putStudentInfo)
router.delete('/student_info', deleteStudentInfo)

export default router