import express from 'express'
import { login, register, requestPasswordReset, setNewPassword, regenerateToken } from '../../../controllers/api/authController'

export const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/register', register)
authRoutes.post('/request-password-reset', requestPasswordReset)
authRoutes.post('/reset-password', setNewPassword)
authRoutes.post('/regenerate-token', regenerateToken)
