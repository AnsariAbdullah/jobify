const notFoundMiddleware = (req, res) => res.status(404).send('Route not exist')

export default notFoundMiddleware;