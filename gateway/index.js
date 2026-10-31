import express from "express"
import proxy from "express-http-proxy"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()


const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    optionsSuccessStatus:200
}))
app.use(cookieParser())
app.use("/api/v1/auth", (req, res, next) => {
  console.log("========== API GATEWAY REQUEST ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Time:", new Date().toLocaleString());
  console.log("Headers:", req.headers);
  console.log("=========================================");

  next();
});
app.use("/auth",proxy(process.env.AUTH_SERVICE))
app.get("/",(req,res)=>{
  res.send("Hello from api gateway")
})
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Gateway Starting on PORT : ${PORT}`)
})