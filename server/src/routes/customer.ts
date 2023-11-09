import express from 'express'
import { createCustomer } from '../controller/customerController'

const router = express.Router()

router.post('/createCustomer', createCustomer)

export default router