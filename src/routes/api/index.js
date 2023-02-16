import express from 'express'
import { authRoutes } from './v1/auth'
import { vehicleRoutes } from './v1/vehicle'
import { requiresAuth } from '../../middlewares/requireAuth'

export const ApiRoutes = express.Router()

ApiRoutes.use('/v1/auth', authRoutes)
ApiRoutes.use('/v1/vehicle', requiresAuth, vehicleRoutes)
