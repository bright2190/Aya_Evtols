import mongoose from 'mongoose'
import { ELoadType } from '../enums/ELoadType'

const loadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter serial number.'],
      unique: [true, 'Vehicle with this serial number already exists.'],
    },
    load_type: {
      type: String,
      enum: ELoadType,
      required: [true, 'Please specify load type.'],
    },
    code: {
      type: Number,
      required: [true, 'Password is required.'],
    },
    images: [
      {
        type: String,
      }
    ],
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

loadSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

export const Load = mongoose.model('loads', loadSchema)
