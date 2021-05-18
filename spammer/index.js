/*
* Code under Mathematica
* Mathematica 2019 - 2021
*/

const mineflayer = require("mineflayer")
const server = require("../settings.json")

const emojis = "☠ ☮ ☯ ♠ Ω ♤ ♣ ♧ ♥ ♡ ♦ ♢ ♔ ♕ ♚ ♛ ⚜ ★ ☆ ✮ ✯ ☄ ☾ ☽ ☼ ☀ ☁ ☂ ☃ ☻ ☺ ☹ ۞  ξЖЗ εжз ☎ ☏ ¢ ☚ ☛ ☜ ☝ ☞ ☟ ✍ ✌ ☢ ☣ ♨ ๑ ❀ ✿ ψ ♆ ☪ ♪ ♩ ♫ ♬ ✄ ✂ ✆ ✉ ✦ ✧♱ ♰ ∞ ♂ ♀ ☿ ❤ ❥ ❦ ❧ ™ ® © ✖ ✗ ✘ ♒■ □ ▢ ▲ △ ▼ ▽ ◆ ◇ ○ ◎ ● ◯ Δ ◕ ◔ʊ ϟ ღ ツ 回 ₪ ™ © ® ¿ ¡ ½ ⅓ ⅔ ¼ ¾ ⅛ ⅜ ⅝ ⅞ ℅ №".split(" ")

function getRandomEmojis(number) {
	let product = ""

	for(let i = 0; i < number; i++) {
		product += emojis[Math.floor(Math.random() * emojis.length)]
	}

	return product
}


function startBot() {
	const name = "Mathematica"+Math.floor(Math.random() * 99999)

	const bot = mineflayer.createBot({
		host: server.host,
		username: name,
	})

	bot.on("kicked", (reason) => {
		console.log(`${name} was kicked for ${reason}`)
	})
	bot.once("spawn", () => {
    
		setInterval(() => {
			bot.chat(getRandomEmojis(200) + " Mathematica on top")
		}, 1500)
	})
	console.log("here")
}

startBot()
setInterval(() => startBot(), 1)