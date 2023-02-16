import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt()
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}
