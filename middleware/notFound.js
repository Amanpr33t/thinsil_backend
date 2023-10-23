const CustomAPIError = require('../errors/custom-error')
const notFound = (req, res) => {
    try {
        res.status(404).send('Route does not exist')
        throw new CustomAPIError('Route not found', 404)
    } catch (error) {
        throw new Error(error)
    }

}
module.exports = notFound