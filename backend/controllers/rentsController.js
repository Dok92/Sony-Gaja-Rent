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
  const { status, rentType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (rentType && rentType !== 'all') {
    queryObject.rentType = rentType
  }
  if (search) {
    // mongo, case insensitive
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

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

  res.status(StatusCodes.OK).json({ rents, totalRents })
}


export { createRent, getAllRents }