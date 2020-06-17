//find_cmds function
//NOTE: this function is unaffected by the loadcommands file, so any changes
//to this file will need a bot restart to take effect.
module.exports = {
	main: function(bot) {
		bot.on("message", message => {

			//prevent recursion with itself
			if (message.author == bot.user) {
				return;
			}

			//don't respond in direct message channels
			if (!message.guild) {
				return;
			}

			//if our command prefix is found...
			if (String(message).startsWith(bot.PREFIX)) {
				var cmdName = String(message).split(" ")[0].substr(2);

				cmdName = cmdName.toLocaleLowerCase(); //lowercase
				
				//if the command name exists and that command is unlocked
				//then execute that command
				if (bot.COMMANDS[cmdName] && !bot.COMMANDS[cmdName].lock) {
					bot.COMMANDS[cmdName].main(bot, message);	
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