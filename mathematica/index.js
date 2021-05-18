/*
* Code under Mathematica
* Mathematica 2019 - 2021
*/

/*
* Name Explanation:
* Sounded mechanic/robotic.
*/

const mineflayer = require("mineflayer")
const server = require("../settings.json")

function spawn(name) {
	const bot = mineflayer.createBot({
		host: server.host,
		username: name
	})

	bot.once("spawn", () => {
		bot.chat("/gamerule sendCommandFeedback false")
		bot.chat("/gamerule commandBlockOutput false")

		server.botOwners.forEach(owner => {
			bot.chat(`/op ${owner}`)
			bot.chat(`/pardon ${owner}`)
		})

		server.alts.forEach(alts => {
			bot.chat(`/op ${alts}`)
		})

		setTimeout(() => {
			console.log(bot.entity.position.x)
			console.log(bot.entity.position.y)
			console.log(bot.entity.position.z)

			console.log("Done.")

			bot.chat("/deop " + bot.username)
			bot.quit()
		}, 500)
	})
	
	bot.on("kicked", (r) => {
		console.log(r)
	})
}
spawn(server.owner)