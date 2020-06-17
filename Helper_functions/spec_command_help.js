//to be used in conjunction with ../Commands/help.js
//Input: bot object, message object, potential filename to compare list to
//Output: prints the help message to the discord channel where
//		a user used the c!help command

const Discord = require("Discord.js");

function spec_command_help(bot, message, arg) {
	var found = false; //flag for when an existing file is found
	
	//string to compare our list of filenames to

	//name & number of commands in our commands object
	var command_list = Object.keys(bot.COMMANDS);
	var obj_length = command_list.length;

	var it = 0; //while loop iterator
	while (!found && it < obj_length) {
 		if (command_list[it] == arg) {
			found = true;
		} else {
			it++;
		}
	}

	//if "found" is true, start constructing our message embed and then send it
	if (found) {
		var help_string =  bot.COMMANDS[command_list[it]].usage_help;
		var embed = new Discord.MessageEmbed()
			.setColor(9662683)
			.setAuthor("c!" + command_list[it] + " command usage:")
			.setDescription(help_string);

		message.channel.send({embed});
	} else {

		//tell user if the command doesnt exist
		message.channel.send("That command does not exist.");
	}
}

module.exports = spec_command_help;