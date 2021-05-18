const mineflayerr = require("mineflayer")
const Discord = require("discord.js")
const credentials = require("./credentials.json")

const qrcode = require("qrcode-terminal")
const { Client, WAState } = require("whatsapp-web.js")
const fs = require("fs")

let mineflayer
let discord
let whatsapp

function whatsappstart() {

	whatsapp = new Client({
		session: fs.existsSync("whatsapp.json") ? require("./whatsapp.json") : undefined
	})

	whatsapp.on("qr", (qr) => {
		qrcode.generate(qr, {small: true})
	})

	whatsapp.on("ready", async () => {
		console.log("Whatsapp - Loaded.")
	})
	whatsapp.on("message", async (message) =>{
		const username = (await message.getContact()).name ? (await message.getContact()).name : (await message.getContact()).number
		const messagee = message.body
		
		const lmfao = "[Whatsapp] " + username + ": " + messagee
		if((await message.getChat()).name !== "Mathematica") return
		if(!messagee) return
		if(mineflayer) {
			mineflayer.chat(lmfao)
		}
		if(discord.readyTimestamp) {
			discord.channels.cache.get("843485659675361284").send(lmfao)
		}
	})
	whatsapp.on("authenticated", (session) => {    
		fs.writeFileSync("whatsapp.json", JSON.stringify(session))
	})
	
	whatsapp.initialize()
}
function discordstart() {
	discord = new Discord.Client()
	discord.on("ready",()=>{console.log("Discord - Loaded.")})

	discord.on("message", async message => {
		if(message.member.user == discord.user) return
		const lmfao = "[Discord] " + message.member.user.username + ": " + message.content.split("\n")[0]
		if(mineflayer) {
			mineflayer.chat(lmfao)
		}
		if(whatsapp) {
			if((await whatsapp.getState()) == WAState.CONNECTED) {
				whatsapp.sendMessage((await whatsapp.getChats()).filter(e=>e.name=="Mathematica")[0].id._serialized, lmfao)
			}
		}
	})

	discord.login(credentials.discord)
}

function minecraftstart() {
	mineflayer = mineflayerr.createBot({
		host: credentials.minecraft.server,
		username: credentials.minecraft.name
	})

	mineflayer.once("spawn",()=>{console.log("Minecraft - Loaded.")})

	mineflayer.on("chat", async (username, message) => {
		if(username == mineflayer.username) return
		const lmfao = "[Minecraft] " + username + ": " + message
		if(discord.readyTimestamp) {
			discord.channels.cache.get("843485659675361284").send(lmfao)
		}
		if(whatsapp) {
			if((await whatsapp.getState()) == WAState.CONNECTED) {
				whatsapp.sendMessage((await whatsapp.getChats()).filter(e=>e.name=="Mathematica")[0].id._serialized, lmfao)
			}
		}
	})

	mineflayer.on("kicked", ()=>{
		console.log("Minecraft - Retrying.")
		setTimeout(()=>{
			minecraftstart()
		}, 5000)
	})
}

whatsappstart()
discordstart()
minecraftstart()