import express from 'express'
import { createCustomer, updateCustomer } from '../controller/customerController'

const router = express.Router()

router.post('/createCustomer', createCustomer)

router.patch('/updateCustomer/:email', updateCustomer)

export default router