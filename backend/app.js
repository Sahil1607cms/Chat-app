import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"

const app = express()

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import authRouter from "./src/routes/auth.route.js"

app.use("/api/user",authRouter)
export default app