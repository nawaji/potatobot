const fs = require("fs") //filesync, used for loading modules
const clearModule = require("clear-module");

module.exports = {
	main: function(bot, message) {
		try {
			//number of commands in use
			var obj_length = Object.keys(bot.COMMANDS).length;

			//check if commands already exist in the require cache
			if (obj_length != 0) {
				console.log("loadcommands was called... loading files again")

				//clear each command from the cache
				for (i = 0; i < obj_length; i++) {
					clearModule("../" + Object.keys(bot.COMMANDS)[i]);
				}
			}

			var files = fs.readdirSync(__dirname + "/../");

			//parse through each element
			files.forEach(element => {
				//if the file ends with .js, require it, otherwise don't
				if (element.endsWith(".js")) {
					bot.COMMANDS[element.slice(0, -3)] 
						= require("../" + element);
					console.log(element + " loaded.");
				}
			});

		} catch (err) {
			//print error to console if found
			console.log(err);
		}
	},

	help: "Re/loads available commands.",
	usage_help: "c!loadCommands",
	hide: true,
	lock: true
}