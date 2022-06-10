import express from 'express'
import { getTrophyRents } from '../controllers/trophiesController.js'

const trophiesRouter = express.Router()

trophiesRouter.route('/').get(getTrophyRents)

export default trophiesRouter