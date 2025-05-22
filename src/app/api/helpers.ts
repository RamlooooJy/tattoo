export const getSecret = () => {
  const SECRET = process.env.JWT_SECRET
  if (!SECRET) {
    throw new Error('JWT_SECRET is required, please use JWT_SECRET variable')
  }

  return SECRET
}
