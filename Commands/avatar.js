module.exports = {
	main: function(bot, message) {

		//obtain the user's avatar as png or gif, of size 2048
		var link = message.author.displayAvatarURL(
			{ format: "png", dynamic: true, size: 2048}
		);

		//send avatar as an attachment
		message.channel.send({
			files:
				[link]
		})
			.catch(console.error);

	},

	help: "Displays your avatar.",
	usage_help: "c!avatar",
	hide: false,
}
