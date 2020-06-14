//const Discord = require("Discord.js");
const fs = require("fs"); //filesync, used for modules
//const clearRequire = require("clear-require");
var files = fs.readdirSync(__dirname);
var commands = {}

const prefix = "c!"; //prefix for chat commands

try{
	//parse through each name in "files"
	for (i = 0; i < files.length; i++) {
		//remove this file from the list to prevent potential recursion
		if (files[i] == "findCommands.js") {
			files.splice(i, 1);
			i--;
		}
	}

	//parse through each element again
	files.forEach(element => {
		//if the file ends with .js, then import, otherwise don't
		if (element.endsWith(".js")) {
			commands[element.slice(0, -3)] 
				= require(__dirname + "/" + element);
			console.log(element + " loaded.");
		}
	});

} catch(err) {
	//print error to console if found
	console.log(err);
}

//findCommands function
module.exports = {
	main: function(bot) {
		bot.on("message", message => {

			//prevent recursion with itself
			if (message.author == bot.user) {
				return;
			}

			//if our command prefix is found...
			if (String(message).startsWith(prefix)) {
				var cmdName = String(message).split(" ")[0].substr(2);

				cmdName = cmdName.toLocaleLowerCase(); //lowercase

				//if the command name exists and that command is unlocked
				//then execute that command
				if (commands[cmdName] && !commands[cmdName].lock) {
					commands[cmdName].main(bot, message);	
				} else {

					//tell user that command doesn't exist
					message.channel.send("That command does not exist.");
				}
			}			
		})
	},

	help: "Handles the execution of commands and such.", //help message
	hide: true, //hides from the help list
	lock: true //prevents people from calling this function
}