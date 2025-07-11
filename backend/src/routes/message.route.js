import express from "express"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getMessages, getSidebarUsers, sendMessages } from "../controllers/message.controller.js"

const router = Router()

router.route("/users").get(verifyJWT,getSidebarUsers)
router.route("/:id").get(verifyJWT,getMessages)

router.route("/send/:id").get(verifyJWT,sendMessages)
router.route("/sender/:id").get(verifyJWT,getSidebarUsers)


export default router