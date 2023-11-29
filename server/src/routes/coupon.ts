import express from 'express'
import { createCoupon, getCouponByCode, getCouponById, getCoupons } from '../controller/couponController'

const router = express.Router()

router.post('/create', createCoupon)

router.get('/', getCoupons)

router.get('/id/:couponId', getCouponById)

router.get('/code/:couponCode', getCouponByCode)

export default router