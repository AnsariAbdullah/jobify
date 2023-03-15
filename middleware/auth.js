import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		throw new UnAuthenticatedError('Authentication Invalid')
	}
	next()
}

export default auth;