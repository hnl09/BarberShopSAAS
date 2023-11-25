import express from 'express'
import { createAppointment } from '../controller/appointmentController'

const router = express.Router()

router.post('/create/:customerEmail/:barberShopEmail', createAppointment)

export default router