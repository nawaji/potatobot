var Discord = require("Discord.js");
const split_args = require("../Helper_functions/split_args.js");

module.exports = {
	main: function(bot, message) {

		if (!split_args(message, 1)) {
			message.channel.send("You need to say something to the 8ball first.");
			return;
		}
		//10 are affirmative, 5 are non-committal, 5 are negative
		var rand_answers = [
			"It is certain.", "It is decidedly so.", "Without a doubt.",
			"Yes – Definitely", "You may rely on it.", "As I see it, yes.",
			"Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
			"Reply hazy, try again.", "Ask again later", "Better not tell you now",
			"Cannot predict now.", "Concentrate and ask again.", "Don't count on it.",
			"My reply is no.", "My sources say no.", "Outlook not good.", "Very Doubtful"
		]

		//pick a random number from 0 to length of rand_answers
		var index = Math.floor(Math.random() * rand_answers.length);
		var option = rand_answers[index];

		//construct our embed with the 8ball message
		var embed = new Discord.MessageEmbed()
			.setDescription(option);

		//green, yellow, then red depending on answer
		if (index >= 0 && index <= 9)	{ embed.setColor("#00FF00") }
		if (index >= 10 && index <= 14) { embed.setColor("#FFFF00") }
		if (index >= 15 && index <= 19) { embed.setColor("#FF0000") }

		message.channel.send({embed});
	},

	help: "Ask the 8-ball a question!",
	usage_help: "c!8ball [question]",
	hide: false
}