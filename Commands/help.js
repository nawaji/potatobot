const Discord = require("Discord.js");
const spec_command_help = require("../Helper_functions/spec_command_help.js");
const split_args = require("../Helper_functions/split_args.js");

module.exports = {
	main: function(bot, message) {

		//if the user inputs an argument for the help command
		var arg = split_args(message, 1)
		if (arg) {
			spec_command_help(bot, message, arg);
			return;
		}

		//name & number of commands in our commands object
		var command_list = Object.keys(bot.COMMANDS);
		var obj_length = command_list.length;
		var list = [];

		for(i = 0; i < obj_length; i++) {
			list.push(command_list[i] + " - " + bot.COMMANDS[command_list[i]].help);
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