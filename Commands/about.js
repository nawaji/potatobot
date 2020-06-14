const Discord = require("Discord.js");

module.exports = {
	main: function(bot, message) {

		//body of message embed to be used
		var desc = [
			"I am a Discord bot developed using Discord.js!",
			"Github: https://github.com/nawaji/potatobot",
			"Discord.js: https://discord.js.org/"
		]

		//construct our message embed then send it
		var embed = new Discord.MessageEmbed()
			.setColor(9662683)
			.setAuthor("About me", bot.user.displayAvatarURL())
			.setTimestamp()
			.setDescription(desc.join("\n"));
		message.channel.send({embed});
	},

	help: "Info about me (the bot)",
	hide: false
}