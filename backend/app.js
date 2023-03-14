require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
require('./config/dbConnection')
const userRouter = require('./routes/userRoutes')
const placeRouter = require('./routes/placesRoutes')

const app = express();
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());


app.use('/api',userRouter,placeRouter)

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    res.status(err.statusCode).json({
        message:err,
    })
    console.log(err)
})

app.listen(3005,()=>console.log("server is running"))