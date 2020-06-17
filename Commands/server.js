const Discord = require("Discord.js");

module.exports = {
	main: function(bot, message) {
		var serv = message.guild;
		var embed = new Discord.MessageEmbed()
			.setColor(9662683) //embed border color
			.setAuthor(serv.name) //header
			.setThumbnail(serv.iconURL()) //image top left of embed
			.addField("Region", serv.region, true) //server region
			.addField("Members", serv.memberCount, true) //member count
			.addField("Server owner", serv.owner.user.username) //server owner
			.addField("Created on", 
				String(serv.createdAt).substr(0, 15)) //creation date
			.setTimestamp();

		message.channel.send({embed});
	},

	help: "Displays server info",
	usage_help: "c!server",
	hide: false
}