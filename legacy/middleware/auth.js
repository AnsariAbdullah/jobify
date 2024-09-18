import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
		// console.log(payload)
    // attach the user request object
    const testUser = payload.userId === '650581ec76f584c96faabe8f';
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication invalid')
  }
}

export default auth;