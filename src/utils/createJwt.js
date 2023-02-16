import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const createToken = (data) => {
  let maxAge = 1 * 24 * 60 * 60; // 1 day default
  const { remember_me } = data;
  const secret = process.env.JWT_SECRET;

  if (remember_me && remember_me === true) {
    maxAge = 30 * 24 * 60 * 60; // 30 day
    return jwt.sign({ data }, secret, { expiresIn: maxAge });
  }
  return jwt.sign({ data }, secret, { expiresIn: maxAge });
};