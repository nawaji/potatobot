const XVIAPI = require("xivapi-js");
const xiv = new XVIAPI()
//const Discord = require("Discord.js")

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
 * outputs: character object data
******************************************************************/
async function char_data(id) {
	let res = await xiv.character.get(id)
		.catch(err => {
			console.log(err);
		})
	return res
}

/******************************************************************
 * Desc: returns the english name of an item
 * inputs: item_id - integer ID of item
 * outputs: string name of item
******************************************************************/
async function item_name(item_id) {
	let res = await xiv.data.get("Item", item_id)
		.catch(err => {
			console.log(err);
		})
	return res.Name_en
}

/******************************************************************
 * Desc: returns an object that contains gear types followed by
 * 		the gear name
 * inputs: gearlist_obj - a character's gearset obj
 * 		(the return object from funct char_data())
 * outputs: object that contains gear types followed by their
 * 		respective gear names
******************************************************************/
async function get_char_gearlist(gearlist_obj) {
	let gear_types = Object.keys(gearlist_obj);
	let res = new Object();

	for (i = 0; i < gear_types.length; i++) {
		res[gear_types[i]] = await item_name(gearlist_obj[gear_types[i]].ID)
	}
	return res;
}

module.exports = { char_search, char_data, item_name, get_char_gearlist }