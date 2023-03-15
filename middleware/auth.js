const auth = async (req, res, next) => {;
	const authorization = req.headers.authorization;
	console.log(authorization);
	next()
}

export default auth;