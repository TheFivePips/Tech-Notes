const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (orgin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !orgin) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by cors'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions