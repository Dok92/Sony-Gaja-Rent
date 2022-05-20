import express from 'express'
import { createRent, getAllRents } from '../controllers/rentsController.js'

const router = express.Router()

router.route('/').post(createRent).get(getAllRents)

export default router