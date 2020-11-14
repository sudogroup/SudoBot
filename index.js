/* eslint-disable no-inline-comments */
const fs = require('fs');
// const TwitchJs = require('twitch-js');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'] }); // Add whatever you want to use from discordjs here, this is activating partils, needed for roles assignment stuff.
const { discordToken, prefix } = require('./assets/config/config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// prepare for cooldown implementation
const cooldowns = new Discord.Collection();

const rules_listener = require('./models/reactions_listener');
rules_listener.execute(client);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	// don't read if the message doesn't start with a prefix
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// pre-process the command
	const args = msg.content.substring(prefix.length).split(/ +/), // remove prefix and split the argument has multiple arguments
		commandName = args.shift().toLowerCase(); // get command and turn it to lowercase

	console.log(args);
	console.log(commandName);

	// commands
	// check for aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	// check if the command is guild only command, does not work in DM
	if (command.guildOnly && msg.channel.type === 'dm') {
		return msg.reply('I can\'t execute that command inside DMs!');
	}

	// check if the command requires arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return msg.channel.send(reply);
	}

	// check if command requires a cooldown period
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	// if the command requires admin to run, check
	if(command.moderator) {
		const roles = new Map();
		msg.guild.roles.cache.map(role => roles.set(role.name, new Object({ object: role, name: role.name, id: role.id })));
		// check if the user has admin permission
		if(!msg.member.roles.cache.has(roles.get('moderators').object.id)) {
			msg.channel.send("You don't have a permission to run the command!");
			return;
		}
	}

	// if the command requires contributor to run, check
	if(command.contributor) {
		const roles = new Map();
		msg.guild.roles.cache.map(role => roles.set(role.name, new Object({ object: role, name: role.name, id: role.id })));
		// check if the user has admin permission
		if(!msg.member.roles.cache.has(roles.get('contributors').object.id)) {
			msg.channel.send('You don\'t have a permission to run the command!');
			return;
		}
	}
	// execute
	try {
		command.execute(msg, args);
	}
	catch (error) {
		console.error(error);
		msg.channel.send('there was an error trying to execute that command!');
	}
	if(command.moderator) {
		// get all channels
		const channels = new Map();
		msg.guild.channels.cache.map(channel => channels.set(channel.name, new Object({ object: channel, name: channel.name, id: channel.id })));

		// get logs channel
		const logs = channels.get('logs').object

		// send log to logs channel if the command mentions someone
		if(msg.mentions.members.first()){
			logs.send(`<@${msg.member.id}>: ${command.name} <@${msg.mentions.members.first().id}>`)
		}
	}
});

client.login(discordToken);
