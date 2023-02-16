import { Vehicle } from '../../models/Vehicle'
import { handleErrors } from '../../utils/errorHandler'
import { StatusCodes } from 'http-status-codes'

export const createVehicle = async (req, res) => {
  const { serial_number, model, current_state, max_weight, battery_capacity, color } = req.body

  try {
    const vehicleExists = await Vehicle.findOne({ serial_number: serial_number })
    if (vehicleExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: { message: 'Vehicle with this serial number already exists' }})
    }

    const vehicle = await Vehicle.create({
      serial_number,
      model,
      current_state,
      max_weight,
      battery_capacity,
      color
    })

    return res.status(StatusCodes.CREATED).json({ vehicle })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const updateVehicleDetail = async (req, res) => {
  const { serial_number, model, current_state, max_weight, battery_capacity, color } = req.body

  try {
    const updated = await Vehicle.findOneAndUpdate(
      { _id: req.params.vehicleId },
      { $set: { 
        serial_number,
        model,
        current_state,
        max_weight,
        battery_capacity,
        color
       }
      },
      { new: true },
    )
    
    if (!updated) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: { message: 'vehicle not found' }})
    }

    return res.status(StatusCodes.CREATED).json({ updated })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId })
    if (!vehicle) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: { message: 'vehicle not found' }})
    }

    return res.status(StatusCodes.OK).json({ vehicle })

  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}

export const fetchAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
    if (!vehicles) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'vehicles not found' })
    }

    return res.status(StatusCodes.OK).json({ vehicles })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}
