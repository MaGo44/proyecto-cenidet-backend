import {Router} from 'express'
import { getCompanysInfo, getCompanyInfo, postCompanyInfo, putCompanyInfo, deleteCompanyInfo } from '../controllers/company_info.controller.js'

const router = Router()

router.get('/company_info', getCompanysInfo)
router.get('/company_info/:id', getCompanyInfo)
router.post('/company_info', postCompanyInfo)
router.patch('/company_info/:id', putCompanyInfo)
router.delete('/company_info', deleteCompanyInfo)

export default router