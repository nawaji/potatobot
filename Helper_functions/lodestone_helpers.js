const XVIAPI = require("xivapi-js");
const xiv = new XVIAPI()
const Discord = require("Discord.js")

/******************************************************************
 * Desc: searches for a character ID via the Lodestone
 * inputs: nm - full name in the form of "first last"
 * 		sv - server
 * outputs: integer ID
******************************************************************/
async function char_search(nm, sv) {
	//before api is called
	let res = await xiv.character.search(nm, {server: sv})
		.catch(err => {
			console.log(err);
		})

	//after api is finishing calling
		return res.Results[0].ID;
}

/******************************************************************
 * Desc: returns character object data via the Lodestone
 * inputs: id - integer ID
 * outputs: character object data w/ additional getter functions
 * 		for easy printing of data
******************************************************************/
async function construct_char_data(id) {
	let res = await xiv.character.get(id, {extended: true})
		.catch(err => {
			console.log(err);
		})		

	//returns the average ilv of the player's gear
	res.Character.GearSet.get_avg_ilv = function() {
		let total_ilv = 0;

		//parse through each equipped gear and add to total ilv their ilv's
		for (const property in res.Character.GearSet.Gear) {
			if (property != "SoulCrystal") {
				total_ilv += this.Gear[property].Item.LevelItem
			}
		}

		if (!this.Gear["OffHand"]) {
			total_ilv += this.Gear["MainHand"].Item.LevelItem
		}

		return Math.floor(total_ilv/13);
	}

	//returns the item name followed by ilv if flag is true
	res.Character.GearSet.get_item = function(nm, ilv_flag) {
		let item_name = this.Gear[nm].Item.Name
		let item_ilv = this.Gear[nm].Item.LevelItem

		if (ilv_flag) {
			return (item_name + " [i" + item_ilv + "]")
		} else {
			return (item_name) 
		}
	}

	return res;	
}

/******************************************************************
 * Desc: returns an item object containing ilv, name, getters
 * inputs: item_id - integer ID of item
 * outputs: object containing name string, ilv int, and getter
 * 		function for printing the name followed by ivl
******************************************************************/
async function equip_details(item_id) {
	let res = await xiv.data.get("Item", item_id)
		.catch(err => {
			console.log(err);
		})
//	console.log(res)
	let new_res = {
		name : res.Name_en,
		ilv : res.LevelItem,
		print : function() {
			if (this.name.includes("Soul of")) {
				return this.name
			} else {
				return this.name + " [i" + this.ilv + "]"
			}
		}
	}
	return new_res;
}

/******************************************************************
 * Desc: handles the display of information in the discord embed
 * inputs: ch_id - character ID, ch_obj - character object
 * outputs: discord embed to be sent in the discord channel
******************************************************************/
async function embed_handler(ch_id, ch_obj) {
	var author_string = [ ch_obj.Character.Name, ch_obj.Character.Title.Name]
	var avatar = ch_obj.Character.Avatar
	var thumb = ch_obj.Character.Portrait
	var lode_url = "https://na.finalfantasyxiv.com/" + "lodestone/character/" 
		+ ch_id + "/"
	var desc = "[Avg Item Level " + ch_obj.Character.GearSet.get_avg_ilv() + "]"

	var embed = new Discord.MessageEmbed()
		.setColor("b54545")
		.setAuthor(author_string.join(", "), avatar, lode_url)
		.setThumbnail(thumb)
		.setDescription(desc)

	//the order the embed should display it's data
	var ordered_list = [
		"MainHand", "OffHand", "Head", "Body", "Hands", "Waist",
		"Legs", "Feet", "Earrings", "Necklace", "Bracelets", "Ring1",
		"Ring2", "SoulCrystal"
	]
	var ch_gearset = ch_obj.Character.GearSet

	//sort the way our embed lists equipment
	//if the equipment is a soul crystal, then don't display it's ilv
	for (i = 0, j = 0; i < ordered_list.length; i++) {
		if (ch_gearset.Gear[ordered_list[i]]) {
			if (ordered_list[i] == "SoulCrystal") {
				var field_string = 
					ch_gearset.get_item(ordered_list[i], false)
			} else {
				var field_string = 
					ch_gearset.get_item(ordered_list[i], true)
			}
			embed.addField(
				ordered_list[i], 
				field_string, 
				true
			)
		}
	}

	return embed;
}

module.exports = { char_search, construct_char_data, equip_details, embed_handler }