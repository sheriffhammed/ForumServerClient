const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const express = require('express')
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');

const app = express()

const userRegistrationRoute = require('./routes/userRegistrationRoute')
const postRoute = require('./routes/postRoute')
const likeRoute = require('./routes/likeRoute')
const authRoute = require('./routes/authRoute')
const refreshTokenRoute = require('./routes/refreshTokenRoute')
const logoutRoute = require('./routes/logoutRoute')

//Middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser());
app.use(cors(corsOptions));

//Users routes
app.use('/auth', authRoute)
app.use('/logout', logoutRoute)
app.use('/refresh', refreshTokenRoute)
app.use('/registration', userRegistrationRoute)
app.use('/registration/:id', userRegistrationRoute)
//app.use('/registration/user/', userRegistrationRoute)

app.use(verifyJWT);
//Posts routes
app.use('/posts', postRoute)
app.use('/posts/:id', postRoute)

//Likes routes
app.use('/likes', likeRoute)
app.use('/likes/:id', likeRoute)

module.exports = app