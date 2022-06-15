import Rent from '../models/Rent.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createRent = async (req, res) => {
    const { days, controllers, rentLocation } = req.body

    if (!days || !controllers || !rentLocation) {
        throw new BadRequestError('Molimo popunite sva polja')
    }   
    
    req.body.createdBy = req.user.userId         
   
    const rent = await Rent.create(req.body)            

    res.status(StatusCodes.CREATED).json({rent})
}

const getAllRents = async (req, res) => {
  const { sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  let result = Rent.find(queryObject)

  // chain sort conditions

  if (sort === 'novije') {
    result = result.sort('-createdAt')
  }
  if (sort === 'starije') {
    result = result.sort('createdAt')
  }
  if (sort === 'cena niska') {
    result = result.sort('price')
  }
  if (sort === 'cena visoka') {
    result = result.sort('-price')
  }

  const rents = await result
  const totalRents = await Rent.countDocuments(queryObject)
  const totalSpent = await rents.reduce((acc, rent) => acc + rent.price, 0)

  res.status(StatusCodes.OK).json({ rents, totalRents, totalSpent })
}

export { createRent, getAllRents }