import { User } from '../models/User'

export const validateResetLink = async (req, res, next) => {
  const { token } = req.query
  try {
    if (token) {
      const user = await User.findOne({ password_reset_token: token })
      if (user) {
        res.locals.user = user
        return next()
      }
    }
    return res.render('404')
  } catch (error) {}
}
