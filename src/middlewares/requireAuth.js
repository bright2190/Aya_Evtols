import jwt from 'jsonwebtoken'
import ld from 'lodash'
import { StatusCodes } from 'http-status-codes'

export const requiresAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
  } else {
    const [tokenType, token] = ld.split(req.headers.authorization, ' ')
    if (token && tokenType === 'Bearer') {
      const secret = process.env.JWT_SECRET
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          console.log(err)
          return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Session Expired' })
        } else {
          // make user available for the next middleware
          // console.log(decodedToken.data)
          res.locals.user = decodedToken.data.id
          res.locals.remember_me = decodedToken.data.id
          next()
        }
      })
    }
  }
}
