import express from 'express'
import { register, login } from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Previše zahteva sa vaše adrese, molimo pokušajte ponovo nakon 15 minuta',
})

const authRouter = express.Router()

authRouter.route('/register').post(apiLimiter, register)
authRouter.route('/login').post(apiLimiter, login)


export default authRouter