import {Router} from 'express'
import { getStudentProfilePics, getStudentProfilePic, postStudentProfilePic,putStudentProfilePic, deleteStudentProfilePic } from '../controllers/student_profile_pic.controller.js'

const router = Router()

router.get('/student_profile_pic', getStudentProfilePics)
router.get('/student_profile_pic/:id', getStudentProfilePic)
router.post('/student_profile_pic', postStudentProfilePic)
router.patch('/student_profile_pic/:id', putStudentProfilePic)
router.delete('/student_profile_pic', deleteStudentProfilePic )

export default router