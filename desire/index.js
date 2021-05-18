/*
* Code under Mathematica
* Mathematica 2019 - 2021
*/

/*
* Name Explanation:
* A (desire) to PVP.
*/

function doit(dupe) {
	const mineflayer = require("mineflayer")
	const { pathfinder } = require("mineflayer-pathfinder")
	const pvp = require("mineflayer-pvp").plugin
	const armorManager = require("mineflayer-armor-manager")
	const settings = require("../settings.json")

	const bot = mineflayer.createBot({
		"host": settings.host,
		"username": "Mathematica"+Math.floor(Math.random() *9999),
		port: settings.port,
	})
    
	bot.loadPlugin(pathfinder)
	bot.loadPlugin(pvp)
	bot.loadPlugin(armorManager)

	bot.once("spawn", ()=>{
		bot.pvp.attackRange = 2.6
		bot.pvp.followRange = 0.1
		bot.pvp.viewDistance = 500
	})

	bot.on("playerCollect", () => {
		checkSword()
	})
    
	bot.on("chat", (username, message) => {
		const args = message.split(" ")
		const command = args.shift()
		
		if (command == "!!attack") {
			if (args[0]) {
				if (bot.players[args[0]] && args[0] !== bot.username) {
					bot.chat(`Attacking ${args[0]}.`)
					bot.pvp.attack(bot.players[args[0]].entity)
				} else {
					bot.chat("Can't find requested player.")
				}
			} else {
				bot.chat(`Attacking ${username}.`)
				bot.pvp.attack(bot.players[username].entity)
			}
        
		} else if (command == "!!stop") {
			if (bot.pvp.target) {
				bot.chat(`Stopped attacking ${bot.pvp.target.username}.`)
				bot.pvp.stop()
			} else {
				bot.chat("Not attacking anybody.")
			}
		} else if (command == "!!help") {
			bot.chat("Desire is a PVP and Utility Bot.")
			bot.whisper(username, "Commands: tpm (teleport), c (recheck), dupe (duplicate), stop (stop attack), attack (attack)")
		} else if (command == "!!tpm") {
			bot.chat("/tp @s lukeacat")
		} else if(command == "!!c") {
			bot.chat("rechecking")
			checkSword()
		} else if(command == "!!dupe") {
			bot.chat("Attempting to duplicate!")
			doit(bot)
		}
	})
    
	bot.on("health", () => {
		const slotID = bot.inventory.slots[bot.getEquipmentDestSlot("off-hand")]
            
		if (slotID && bot.health < 12) {
			bot.activateItem({offHand: true})
			setTimeout(() => {   
				bot.deactivateItem()
				checkSword()
			}, 1750)
		}
	})
    
	bot.on("respawn", () => {
		setTimeout(() => {
			bot.pvp.stop()
		}, 2000)
	})
    
	bot.on("kicked", (r)=>{
		r = JSON.parse(r)

		if(!r.extra) return
		if(!r.extra.length) return
		if(!r.extra[0].text.includes("Connection throttled")) return
			
		if(dupe) dupe.chat("Could not dupe, connection throttled. 5000ms for next attempt.")
        
		setTimeout(() => {
			doit(bot)
		}, 5000)
	})

	bot.on("error", () => {
		if(dupe) dupe.chat("Could not dupe, network error. 5000ms for next attempt.")

		setTimeout(() => {
			doit(bot)
		}, 5000)
	})
        
	async function checkSword() {
		const sword = bot.inventory.items().find(item => item.name.includes("sword"))
		const axe = bot.inventory.items().find(item => item.name.toLowerCase().includes("axe"))
		const gap = bot.inventory.items().find(item => item.name === "enchanted_golden_apple")
		const shield = bot.inventory.items().find(item => item.name === "shield")
        
		if(shield) bot.equip(shield, "off-hand")
		if(gap) bot.equip(gap, "off-hand")
		if(axe) bot.equip(axe, "hand")
		if(sword) bot.equip(sword, "hand")
	}
}
    
doit()