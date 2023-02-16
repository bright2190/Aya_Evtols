import express from 'express'
import { createVehicle , updateVehicleDetail, fetchVehicleById} from '../../../controllers/api/vehicleController'

export const vehicleRoutes = express.Router()

vehicleRoutes.post('/', createVehicle)
vehicleRoutes.patch('/:vehicleId', updateVehicleDetail)
vehicleRoutes.get('/:vehicleId', fetchVehicleById)
