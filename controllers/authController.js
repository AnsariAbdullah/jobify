const register = async (req, res) => {
	res.send('register send')
}

const login = async (req, res) => {
	res.send('login send')
}

const updateUser = async (req, res) => {
	res.send('updateUser')
}

export {
	register,
	login,
	updateUser
}