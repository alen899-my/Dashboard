const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()

const authroot=require("../backend/routes/auth")
const userroots=require("../backend/routes/User")
const app=express()
app.use(cors());
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));
app.use('/api/auth',authroot)
app.use('/api/admin', userroots);



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('mongo connected');
    app.listen(process.env.PORT,()=>{
        console.log(`serving on port ${process.env.PORT}`)
    })
}).catch(err=>console.error(err))