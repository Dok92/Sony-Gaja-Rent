import express from 'express'
import { createRent, deleteRent, getAllRents, updateRent, showStats } from '../controllers/rentsController.js'

const router = express.Router()

router.route('/').post(createRent).get(getAllRents)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteRent).patch(updateRent)

export default router