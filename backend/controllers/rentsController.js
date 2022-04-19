import Rent from '../models/Rent.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

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

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const rents = await result

  const totalRents = await Rent.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalRents / limit)

  res.status(StatusCodes.OK).json({ rents, totalRents, numOfPages })
}

const updateRent = async (req, res) => {
    const { id: rentId } = req.params
    const { company, position } = req.body

    if (!position || !company) {
      throw new BadRequestError('Molimo popunite sva polja')
    }

    const rent = await Rent.findOne({ _id: rentId })

    if (!rent) {
        throw new NotFoundError(`Ne postoji poružbina :${rentId}`)
      }

    // check permissions    
    checkPermissions(req.user, rent.createdBy)

    const updatedRent = await Rent.findOneAndUpdate({ _id: rentId }, req.body, {
        new: true,
        runValidators: true,
      })

    // * Use this approach in cases where model has hooks (like in User), if you dont wont hooks triggered.
    // rent.position = position
    // rent.company = company
    // await rent.save()
    
    res.status(StatusCodes.OK).json({ updatedRent })
} 

const deleteRent = async (req, res) => {
  const { id: rentId } = req.params

  const rent = await Rent.findOne({ _id: rentId })

  if (!rent) {
    throw new NotFoundError(`Ne postoji poružbina :${rentId}`)
  }

  checkPermissions(req.user, rent.createdBy)

  await rent.remove()

  res.status(StatusCodes.OK).json({ msg: 'Uspešna porudžbina!' })
}  

const showStats = async (req, res) => {
  let stats = await Rent.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]) 

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  // mongo aggregate
  let monthlyApplications = await Rent.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createRent, deleteRent, getAllRents, updateRent, showStats }