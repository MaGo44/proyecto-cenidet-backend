import {Router} from 'express'
import { getAgreementStatus } from '../controllers/agreement_status.controller.js'

const router = Router()

router.get('/agreement_status', getAgreementStatus)

export default router