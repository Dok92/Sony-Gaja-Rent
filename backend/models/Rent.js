import mongoose from 'mongoose'

const { Schema } = mongoose;

// TODO - add console, controlers, numOfDays, projector(boolean), price, date, 
const RentSchema = new Schema(
  {
    console: {
      type: String
    },
    days: { 
      type: Number,
      required: [true, 'Molimo unesite broj dana'],
      // enum: ['full-time', 'part-time', 'remote', 'internship'],
      // default: 'full-time',
    },
    controllers: {
      type: Number,
      required: [true, 'Molimo unesite broj džojstika']
    },
    rentLocation: {
      type: String,
      required: [true, 'Molimo unesite mesto'],
    },
    projector: {
      type: String,
      default: 'Ne',      
    },
    price: {
      type: Number
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Molimo unesite korisnika'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Rent', RentSchema)