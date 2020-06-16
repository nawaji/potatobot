module.exports = {
	main: function(bot, message) {

		//random number from 1 to 100
		var num = parseInt(Math.floor(Math.random() * 100) + 1);
		
		//send roll message
		message.channel.send(":game_die: " + num);
	},

	help: "Roll a random number from 1 to 100.",
	usage_help: "c!roll",
	hide: false
}