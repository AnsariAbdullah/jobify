import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(req.cookies);
  if (!token) throw new UnauthenticatedError('authentication invalid');
  try {
    const { userId, role } = verifyJWT(token);
    console.log(userId, role);
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
}