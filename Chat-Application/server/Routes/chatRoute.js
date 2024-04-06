const express = require("express")
const {creatChat,findChat,findUserChats} = require("../Controllers/chatControllers")

const router = express.Router()

router.post("/",creatChat)
router.get("/find/:firstId/:secondId",findChat)
router.get("/:userId",findUserChats)

module.exports = router