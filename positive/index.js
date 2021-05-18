/*
* Code under Mathematica
* Mathematica 2019 - 2021
*/

/*
* Name Explanation:
* Negative (now Desire) but upside down, making it Positive
*/


const mineflayer = require("mineflayer")
const { pathfinder } = require("mineflayer-pathfinder")
const pvp = require("mineflayer-pvp").plugin
const armorManager = require("mineflayer-armor-manager")

const settings = require("../settings.json")

const bot = mineflayer.createBot({
	host: settings.host,
	username: "Mathematica"+Math.floor(Math.random() * 99999)
})

let toggle = ""

bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)

bot.loadPlugin(armorManager)

bot.once("spawn", () => {
	setInterval(() => {
		if(!toggle) {
			bot.pvp.stop()
			return
		}
		const player = bot.players[toggle]
		if(!player.entity) return

		bot.entity.position.x = player.entity.position.x + getRandomArbitrary(-2, 2)
		bot.entity.position.y = player.entity.position.y
		bot.entity.position.z = player.entity.position.z + getRandomArbitrary(-2, 2)


		bot.pvp.attack(player.entity)
	}, 1)
})

bot.on("chat", (username, message) => {
	const args = message.split(" ")
	args.shift()
	
	if(message === "start") toggle = args.join(" ")
	if(message === "stop") toggle = ""
})

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min
}

