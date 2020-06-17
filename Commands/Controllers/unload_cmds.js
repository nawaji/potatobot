const clearModule = require("clear-module");

module.exports = {
	main: function(bot, message) {
		try {

			//number of commands in our commands object
			var obj_length = Object.keys(bot.COMMANDS).length;

			//check if commands already exist in the require cache
			if (obj_length != 0) {

				//clear each command from the cache
				for (i = 0; i < obj_length; i++) {
					clearModule("../" + Object.keys(bot.COMMANDS)[i]);
				}

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