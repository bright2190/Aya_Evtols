import express from 'express'
import { ApiRoutes } from './api/index'
import { WebRoutes } from './web/index'
import { StatusCodes } from 'http-status-codes'

export const router = express.Router()

router.use('/', WebRoutes)
router.use('/api', ApiRoutes)
router.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).render('404')
})