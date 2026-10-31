import express from "express"
import { login } from "../controller/auth.controller.js"
const router  = express.Router()

router.post("/login",login)
router.get("/check",(req,res)=>{
    try {
        res.send("check api from auth")
    } catch (error) {
        return res.send("Error from auth")
        
    }
})

export default router