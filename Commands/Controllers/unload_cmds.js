const clearModule = require("clear-module");
module.exports = {
	main: function(bot, message) {
		try {

			//name & number of commands in our commands object
			var command_list = Object.keys(bot.COMMANDS);
			var obj_length = command_list.length;

			//check if commands already exist in the require cache
			if (obj_length != 0) {

				console.log("Unloading commands!");
				for (i = 0; i < obj_length; i++) {
					clearModule("../" + String(command_list[i]));
				}
				bot.COMMANDS = {};

				console.log("Commands currently loaded: " + 
					Object.keys(bot.COMMANDS).length
				);

			} else {
				console.log("unload_cmds.js was called, but no commands exist!");

			}
		} catch(err) {
			console.log(err);
		}
	},

	help: "Unloads available commands.",
	usage_help: "c!unload_cmd",
	hide: true,
	lock: true
}