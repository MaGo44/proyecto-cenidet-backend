import {Router} from 'express'
import { getStudentDocument, getStudentDocuments, postStudentDocument,putStudentDocument, deleteStudentDocument } from '../controllers/student_documents.controller.js'

const router = Router()

router.get('/student_documents', getStudentDocuments)
router.get('/student_documents/:id', getStudentDocument)
router.post('/student_documents', postStudentDocument)
router.patch('/student_documents/:id', putStudentDocument)
router.delete('/student_documents', deleteStudentDocument )

export default router