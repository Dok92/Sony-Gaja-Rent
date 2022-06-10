import express from 'express'
import { createRent, getAllRents } from '../controllers/rentsController.js'

const rentsRouter = express.Router()

rentsRouter.route('/').post(createRent).get(getAllRents)

export default rentsRouter