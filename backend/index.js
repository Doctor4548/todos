const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());


app.use('/api/user', require('./routers/userRouter.js'))
app.use('/api/todo', require('./routers/todoRouter.js'))


mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('database is ready')
    app.listen(process.env.PORT, ()=>{
        console.log(`Port is ready at ${process.env.PORT}`)
    })
})
