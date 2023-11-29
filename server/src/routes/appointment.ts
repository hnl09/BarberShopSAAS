import express from 'express'
import { createAppointment, updateAppointment } from '../controller/appointmentController'

const router = express.Router()

router.post('/create/:customerEmail/:barberShopEmail', createAppointment)

router.patch('/update/:customerEmail/:barberShopEmail/:appointmentId', updateAppointment)

export default router