const fs = require("fs") //filesync, used for loading modules
const clearModule = require("clear-module");
module.exports = {
	main: function(bot, message) {
		try {

			var files = fs.readdirSync(__dirname + "/../");
			var it = 1;

			console.log("Loading commands!");
			//parse through each element
			files.forEach(element => {
				//if the file ends with .js, require it, otherwise don't
				if (element.endsWith(".js")) {
					bot.COMMANDS[element.slice(0, -3)] 
						= require("../" + element.slice(0, -3));
					console.log(it + ": " + element + " loaded.");
					it++;
				}
			});

		} catch (err) {
			//print error to console if found
			console.log(err);
		}
	},

	help: "Loads available commands.",
	usage_help: "c!load_cmd",
	hide: true,
	lock: true
}