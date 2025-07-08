import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./src/db/index.js";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 8001

connectDB()
.then(
    app.listen(PORT,()=>{
        console.log("Server is running on Port :",PORT)
    })
)
.catch((err)=>{
    console.log("Database connection failed")
})
