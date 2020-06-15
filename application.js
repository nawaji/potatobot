const botToken = require(__dirname + "/key.js"); //import our bot token from a separate file
const token = botToken.discord; //carries our bot token
const Discord = require("discord.js");
const bot = new Discord.Client(); //new discord instance

const findCommands = require(__dirname + "/Commands/findCommands");

//print to console once it's logged in
bot.on("ready", () => {
	console.log("Logged in as " + bot.user.tag);

	bot.user.setActivity(); //clear activity first and then set it again
	bot.user.setActivity("Kaguya", { type: "WATCHING"});
})

//commands handler
findCommands.main(bot);

//log in
bot.login(token);
