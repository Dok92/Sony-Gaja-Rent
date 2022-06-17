import mongoose from 'mongoose'

const { Schema } = mongoose;

const RentSchema = new Schema(
  {
    console: {
      type: String
    },
    days: { 
      type: Number || '',
      required: [true, 'Molimo unesite broj dana'],
    },
    controllers: {
      type: Number || '',
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
    phone: {
      type: String,
      required: [true, 'Molimo unesite broj telefona'],
    },
    price: {
      type: Number
    },
    note: {
      type: String
    },
    trophy: {
      type: [String]
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