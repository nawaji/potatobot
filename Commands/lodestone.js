const Discord = require("Discord.js")
const split_args = require("../Helper_functions/split_args");
const ls_getters = require("../Helper_functions/lodestone_getters")

module.exports = {
	main: async function(bot, message) {
		try {

			//check if a server name is provided
			if (!split_args(message, 1)) {
				message.channel.send("You need to provide a server name!")
				return;
			}

			//check if a full character name is provided (first, then last)
			if (!split_args(message, 2) || !split_args(message, 3)) {
				message.channel.send("You need to provide a full character name!")
				return;
			}

			//full_name is an array containing both first and last name
			var full_name = [split_args(message, 2), split_args(message, 3)]
			var server_name = split_args(message, 1);

			message.channel.startTyping();

			/*********************************************************
			 * Get a character ID, then get the character obj that
			 * contains details from lodestone.
			 * Generate a gearlist obj that holds our gear types and
			 * gear names.
			 * Create a discord embed and send it.
			*********************************************************/
			const char_ID = await ls_getters.char_search(full_name.join(" "), server_name)
			const char_obj = await ls_getters.char_data(char_ID);
			const char_lode_url = "https://na.finalfantasyxiv.com/"
				+ "lodestone/character/" + char_ID + "/"

			const gearlist = 
				await ls_getters.get_char_gearlist(char_obj.Character.GearSet.Gear)

			message.channel.stopTyping();

			//discord embed
			var embed = new Discord.MessageEmbed()
				.setColor("b54545")
				.setAuthor(
					char_obj.Character.Name, 
					char_obj.Character.Avatar, 
					char_lode_url
				)
				.setThumbnail(char_obj.Character.Portrait)
//				.setImage(char_obj.Character.Portrait);

			for (const property in gearlist) {
				embed.addField(property, gearlist[property], true)
//				console.log(property +  " - " + gearlist[property])
			}

			message.channel.send({embed}).then(
				message.channel.stopTyping()
			)

		//in case of error...
		} catch(err) {
			message.channel.send("A Character was not found. Try again." + 
				"\n`c!help lodestone` for more info.")

			message.channel.stopTyping()
			console.log(err)
		}
	},

	help: "Displays a character's info from XIV Lodestone.",
	usage_help: "c!lodestone [server] [first name] [last name]",
	hide: false
}