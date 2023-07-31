import {Router} from 'express'
import { getStudentProject, getStudentProjects, postStudentProject,putStudentProject, deleteStudentProject } from '../controllers/student_project.controller.js'

const router = Router()

router.get('/student_project', getStudentProjects)
router.get('/student_project/:id', getStudentProject)
router.post('/student_project', postStudentProject)
router.patch('/student_project/:id', putStudentProject)
router.delete('/student_project', deleteStudentProject)

export default router