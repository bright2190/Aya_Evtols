import { User } from '../../models/User'
import { createToken } from '../../utils/createJwt'
import { handleErrors } from '../../utils/errorHandler'
import { hashPassword } from '../../utils/hashPassword'
import { mailer } from '../../utils/mailer'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import randomId from 'random-id'

export const login = async (req, res) => {
  const { email, password, remember_me } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw Error('invalid credentials')
    }

    if (user.password && user.password.length > 0) {
      const pwd = await bcrypt.compare(password, user.password)
      if (pwd) {
        const token = createToken({
          id: user._id,
          remember_me,
        })
        return res.status(StatusCodes.OK).json({ user, token })
      }
    }

    // failed credentials
    throw Error('invalid credentials')
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}

export const register = async (req, res) => {
  const { last_name, first_name, email, password } = req.body

  try {
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: { email: 'Email already exists' }})
    }

    const pwdHash = await hashPassword(password)

    const user = await User.create({
      last_name,
      first_name,
      email,
      password: pwdHash
    })

    const token = createToken({ id: user._id })

    return res.status(StatusCodes.CREATED).json({ user, token })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body

  try {
    const emailExists = await User.findOneAndUpdate(
      { email: email },
      { $set: { password_reset_token: randomId(49) } },
      { new: true },
    )
    
    if (!emailExists) {
      throw Error('user not found')
    }

    let sender = process.env.EMAIL_NO_REPLY
    const data = {
      to: email,
      from: sender,
      name: 'AyaVTOL',
      subject: 'AyaVTOL Password Reset',
      text: `Follow this link to reset your passowrd: ${process.env.BASE_URL}/set-new-password?token=${emailExists.password_reset_token}`,
      html: `<h3>Follow this link to reset your passowrd: <a href="${process.env.BASE_URL}/set-new-password?token=${emailExists.password_reset_token}">${process.env.BASE_URL}/set-new-password?token=${emailExists.password_reset_token}</a></h3>`,
    }

    const mailsender = mailer(data)

    return res.status(StatusCodes.CREATED).json({ success: "LINK SENT! Please check your email for a recovery link." })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const setNewPassword = async (req, res) => {
  const { token, new_password } = req.body
    try {
      const pwdHash = await hashPassword(new_password)

      const user = await User.findOneAndUpdate(
        { password_reset_token: token },
        { $set: { password_reset_token: '', password: pwdHash } },
      )
      if (!user) {
        throw Error('invalid token')
      }

      return res.status(StatusCodes.OK).json({ success: 'SUCCESSFUL' })
    } catch (err) {
      const error = handleErrors(err)
      return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

export const regenerateToken = async (req, res) => {
  try {
    const token = createToken({
      id: res.locals.user,
      remember_me: res.locals.remember_me,
    })

    return res.status(StatusCodes.OK).json({ token })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}
