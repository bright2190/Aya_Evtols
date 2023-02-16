import mongoose from 'mongoose'
import { EVehicleState } from '../enums/EVehicleState'
import { EVehicleModel } from '../enums/EVehicleModel'

const vehicleSchema = new mongoose.Schema(
  {
    serial_number: {
      type: String,
      required: [true, 'Please enter serial number.'],
      unique: [true, 'Vehicle with this serial number already exists.'],
    },
    model: {
      type: String,
      enum: EVehicleModel,
      required: [true, 'Please enter vehicle model.'],
    },
    current_state: {
      type: String,
      enum: EVehicleState,
      default: EVehicleState.IDLE,
    },
    max_weight: {
      type: Number,
      default: 500
    },
    battery_capacity: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: {
      virtuals: true,
    },
  },
)

vehicleSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const Vehicle = mongoose.model('vehicles', vehicleSchema)
