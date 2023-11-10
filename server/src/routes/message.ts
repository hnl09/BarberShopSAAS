import express from 'express'
import { sendMessage } from '../controller/messageController'

const router = express.Router()

router.post('/sendMessage/:email', sendMessage)

export default router