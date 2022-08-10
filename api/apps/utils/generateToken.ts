import * as JWT from 'jsonwebtoken'

export const generateAccessToken = (role: string): string => {
  return JWT.sign({ role }, process.env.SECRET_ACCESS_TOKEN, {})
}

export const generateRefrestToken = (role: string): string => {
  return JWT.sign({ role }, process.env.SECRET_REFRESH_TOKEN, {})
}
