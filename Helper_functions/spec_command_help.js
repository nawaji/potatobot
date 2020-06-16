//to be used in conjunction with ../Commands/help.js
//Input: a potential filename of a command file
//Output: prints the help message to the discord channel where
//		a user used the c!help command

const fs = require("fs");
const Discord = require("Discord.js");
const split_args = require( __dirname + "/split_args.js");
var files = fs.readdirSync(__dirname + "/../Commands/");

function spec_command_help(message) {
	var found = false; //flag for when an existing file is found
	
	//string to compare our list of filenames to
	var new_message = split_args(message, 1).toLocaleLowerCase();

	//parse through each filename, if a match is found, change our "found" to true
	for (i = 0; i < files.length; i++) {
		var element_name = files[i].slice(0, -3);
		if (element_name == new_message) {
			found = true;
			i = files.length;
		}
	}

	//if "found" is true, start constructing our message embed and then send it
	if (found) {
		var temp = require(__dirname + "/../Commands/" + new_message);
		var embed = new Discord.MessageEmbed()
			.setColor(9662683)
			.setAuthor("c!" + element_name + " command usage:")
			.setDescription(temp.usage_help);

		message.channel.send({embed});
	} else {
		//tell user if the command doesnt exist
		message.channel.send("That command does not exist.");
	}
}

module.exports = spec_command_help;