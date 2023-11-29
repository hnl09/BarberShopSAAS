import express from 'express'
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from '../controller/appointmentController'

const router = express.Router()

router.get('/:barberShopEmail', getAppointments)

router.post('/create/:customerEmail/:barberShopEmail', createAppointment)

router.patch('/update/:customerEmail/:barberShopEmail/:appointmentId', updateAppointment)

router.delete('/delete/:appointmentId', deleteAppointment)

export default router