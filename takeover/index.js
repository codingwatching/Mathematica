const mineflayer = require("mineflayer")

const settings = require("../settings.json")

const joebiden = ["joe biden 1#", "joe 2021 :heart:", "joe birden", "omg joe", "joebiden hack v2", "i love joe biden sooo much"]


const bot = mineflayer.createBot({
	host: settings.host,
	username: "Munanjo_2001",
	port: settings.port,
})

const whitelist = ["lukeacat", "Munanjo_2001", "Wuraz", "pog69cool69"]

bot.on("spawn", () => {
	Object.entries(bot.players).forEach(player => {
		if(!whitelist.includes(player[0])) {
			console.log("Drone spawned under " + player[0])

			spawnDrone(player[0])
		} else {
			console.log("Found whitelisted player " + player[0])
		}
	})
})

async function spawnDrone(name) {
	const drone = mineflayer.createBot({
		host: settings.host,
		username: name,
		port: settings.port,
	})
	drone.on("spawn", () => {
		setInterval(()=>{
			drone.chat(joebiden[Math.floor(Math.random() * joebiden.length)])
		},1000)
	})
	drone.on("kicked", (e)=>{
		console.log(e)
		console.log(name + " | Kicked. Reconnecting")
		spawnDrone(name)
	})
	
	drone.on("error", (e)=>{
		console.log(e)
		console.log(name + " | Network error. Reconnecting")
		spawnDrone(name)
	})
}
