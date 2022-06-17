const notFoundMiddleware = (req, res) => res.status(404).send('Pogrešna putanja')

export default notFoundMiddleware   