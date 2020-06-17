module.exports = {
	main: function(bot, message) {

		//assign current date to a start variable
		var start = Date.now();
		var stop, diff;

		//send a message to channel
		message.channel.send("Pinging...").then(function(old_msg) {
			//assign a stop date and calculate difference
			var stop = Date.now();
			var diff = stop - start;

			//edit message to show the delay in editing
			old_msg.edit(":ping_pong: **|** `(" + diff + "ms)`");
		});
	},
	help: "Ping the bot.",
	usage_help: "c!ping",
	hide: false
};