import express from 'express'
import { register, login } from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Previše zahteva sa vaše adrese, molimo pokušajte ponovo nakon 15 minuta',
})

const router = express.Router()

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
// router.route('/updateUser').patch(authenticateUser, updateUser)
// router.route('/deleteUser').delete(deleteUser)


export default router