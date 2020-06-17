const botToken = require(__dirname + "/key.js"); //import our bot token from a separate file
const token = botToken.discord; //carries our bot token
const Discord = require("discord.js");
const bot = new Discord.Client(); //new discord instance

const loadCommands = require(__dirname + "/Commands/loadcommands");
const findCommands = require(__dirname + "/Commands/findcommands");

bot.PREFIX = "c!"; //prefix followed by command name to use command
bot.OWNER = -1; //the bot owner's user ID (this is used for reloading commands)
bot.COMMANDS = {}; //command object that holds all the commands

//print to console once it's logged in
bot.on("ready", () => {
	console.log("Logged in as " + bot.user.tag);

	bot.user.setActivity(); //clear activity first and then set it again
	bot.user.setActivity("Kaguya", { type: "WATCHING"});
})

//load commands for the first time to set everything up
loadCommands.main(bot); 

//command handler
findCommands.main(bot);

//log in
bot.login(token);
