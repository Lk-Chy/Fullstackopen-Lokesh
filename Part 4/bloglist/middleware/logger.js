const log = (req) => console.log(`${req.method} ${req.path} - Body:`, req.body)
module.exports = { log }
