var botToken = require(__dirname + "/key.js"); //import our bot token from a separate file
var token = botToken.discord; //carries our bot token
const Discord = require("discord.js");
const bot = new Discord.Client(); //new discord instance

//command controllers
const command_loader = require(__dirname + "/Commands/Controllers/load_cmds");
const command_finder = require(__dirname + "/Commands/Controllers/find_cmds");

bot.PREFIX = "c!"; //chat prefix to be followed by chat command (i.e c!help)
bot.COMMANDS = {}; //commands object that holds each command as keys

//print to console once it's logged in
bot.on("ready", () => {
	console.log("Logged in as " + bot.user.tag);

	bot.user.setActivity(); //clear activity first and then set it again
	bot.user.setActivity("Kaguya", { type: "WATCHING"});
})

//load commands for the first time to set everything up
command_loader.main(bot); 

//command handler
command_finder.main(bot);

//log in
bot.login(token);
