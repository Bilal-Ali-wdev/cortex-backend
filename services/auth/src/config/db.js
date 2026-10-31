import mongoose from "mongoose"
export const connectDB = async()=>{
    try {
       const dbConnection =  await mongoose.connect(process.env.MONGODB_URI)
       console.log(`DB connection successfully, HOST : ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(`DB connection failed : ${error}`)
        process.exit(1)
    }
}