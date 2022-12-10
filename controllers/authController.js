const register = (req, res)  => {
	res.send('register send')
}

const login = (req, res)  => {
	res.send('login send')
}

const updateUser = (req, res)  => {
	res.send('updateUser')
}

export {
	register,
	login,
	updateUser
}