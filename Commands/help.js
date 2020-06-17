const Discord = require("Discord.js");
const fs = require("fs");
const spec_command_help = require("../Helper_functions/spec_command_help.js");
const split_args = require("../Helper_functions/split_args.js");

module.exports = {
	main: function(bot, message) {
		var list = [];

		//gather the filenames of each module
		const files = fs.readdirSync(__dirname);
		files.forEach(element => {
			var element_name = element.slice(0, -3);
			//load the module to obtain the help string
			var temp = require(__dirname + "/" + element);

			//if the module is not hidden, print it out
			if (!temp.hide) {
				list.push(element_name + " - " + temp.help);
			}
		})

		//if the user wants to see the help message for a specific command
		if (split_args(message, 1)) {
			spec_command_help(message);
			return;
		}

		var author_string = [
			"Available commands\n", bot.PREFIX, "<command> to use."
		]
		
		//send the full list of help messages of each visible command
		var embed = new Discord.MessageEmbed()
			.setColor(9662683)
			.setTimestamp()
			.setAuthor(author_string.join(""))
			.setDescription(list.join("\n"));
		message.channel.send({embed});

	},

	help: "Displays a list of usable commands",
	usage_help: "c!help, c!help [command]",
	hide: true
}