/*
* Code under Mathematica
* Mathematica 2019 - 2021
*/

const mineflayer = require("mineflayer")
const server = require("../settings.json")

let amount = 20
let current = 0

function startBot(name) {
	const bot = mineflayer.createBot({
		host: server.host,
		port: server.port,
		username: name,
	})

	bot.on("spawn", ()=>{
		bot.setControlState("forward", true)

		setTimeout(()=>{
			setInterval(()=>{
				bot.chat("omg i love joe biden "+Math.floor(Math.random() * 99999))
			}, 5000)
		}, 200)
	})
	bot.on("kicked", () => { 
		console.log("Experienced END")
		setTimeout(()=>{
			startBot(name)
		}, 5000)
	})
}

setInterval(() => {
	current += 1
    
	if(current <= amount) { 
		console.log("spawned")
		startBot("Mathematica"+Math.floor(Math.random() * 99999))
	}
}, 5000)