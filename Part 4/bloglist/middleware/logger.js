const { info, error } = require("../utils/loggers")

const requestLogger = (req, res, next) => {
    info(`${req.method} ${req.path} - Body`, req.body)
    next()
}


const unknownEndpoint = (req, res) => {
    res.status(400).json({error: 'Unknown endpoint'})
}

const errorHandler = (err,req,res,next)=>{
    error(err.message)
    if(err.name === 'ValidationError'){
        return res.status(400).json({error: err.message})
    }
    res.status(500).json({error: "Something went wrong"})

}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}