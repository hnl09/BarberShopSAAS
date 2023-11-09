import express from 'express'
import { sendMessage } from '../controller/wppController'

const router = express.Router()

router.post('/sendMessage', sendMessage)

export default router