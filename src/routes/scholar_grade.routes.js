import {Router} from 'express'
import { getScholarGrades} from '../controllers/scholar_grade.controller.js'

const router = Router()

router.get('/scholar_grades', getScholarGrades)

export default router