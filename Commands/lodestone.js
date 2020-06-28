const Discord = require("Discord.js")
const split_args = require("../Helper_functions/split_args");
const ls_getters = require("../Helper_functions/lodestone_helpers")
const XVIAPI = require("xivapi-js");
const xiv = new XVIAPI()

async function get_arguments(message) {
	//full_name is an array containing both first and last name
		let full_name = [split_args(message, 2), split_args(message, 3)]
		let server_name = split_args(message, 1);
		let args = {
			name: full_name.join(" "),
			server: server_name
		}

		return args
};

module.exports = {
	main: async function(bot, message) {
		try {

			if (String(message).split(" ").length < 3) {
				message.channel.send("Invalid arguments\n" + 
					"c!lodestone [server] [first name] [last name]")
			}			

			message.channel.startTyping();

			const args = await get_arguments(message)
			const char_ID = await ls_getters.char_search(args.name, args.server)
			const char_obj = await ls_getters.construct_char_data(char_ID);
			const embed = await ls_getters.embed_handler(char_ID, char_obj);

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