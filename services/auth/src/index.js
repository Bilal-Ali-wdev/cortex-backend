import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "../src/routes/auth.routes.js"
dotenv.config()


const app = express()


app.use(express.json())
// app.use(cors({
//   origin:process.env.FRONTEND_URL,
//   credentials:true
// }))
app.use(cookieParser())

//routes
app.use("/a",authRoute)


app.use("/",(req,res)=>{
    res.send("AUTH service called")
})

const PORT = process.env.PORT || 8001

app.listen(PORT,()=>{
    console.log(`Gateway Starting on PORT : ${PORT}`)
    connectDB()
})