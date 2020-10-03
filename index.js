const Discord = require('discord.js');
const client = new Discord.Client();
const { discord_token, prefix } = require('./assets/config/config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // don't read if the message doesn't start with a prefix
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  // pre-process the command
  const args = msg.content.substring(prefix.length).split(' '), // remove prefix and split the argument has multiple arguments
        cmd = args[0].toLowerCase(); // get command and turn it to lowercase
  console.log(args)
  console.log(cmd)

  // commands
  if (cmd === 'ping') {
    msg.channel.send('Pong!');
  }
  else if (cmd === 'addproject') {
		// get all roles and channels
    const roles = new Map(),
          channels = new Map();
    msg.guild.roles.cache.map(role => roles.set(role.name, new Object({ object: role, name: role.name, id: role.id })));
		msg.guild.channels.cache.map(channel => channels.set(channel.name, new Object({ object: channel, name: channel.name, id: channel.id })));

    // check if the user has admin permission
    if(!msg.member.roles.cache.has(roles.get('admins').object.id)) {
      msg.channel.send("You don't have a permission to run the command!");
      return;
    }
		// get parameters
    const project = args[1];
    console.log(project)

		// create the new channel
		msg.guild.channels.create(project, { parent: channels.get('/projects').object });
		msg.channel.send('A new project channel was created for ' + project);
  }
  else if (cmd === 'addstreamer') {
		// get all roles and channels
    const roles = new Map(),
          channels = new Map();
    msg.guild.roles.cache.map(role => roles.set(role.name, new Object({ object: role, name: role.name, id: role.id })));
		msg.guild.channels.cache.map(channel => channels.set(channel.name, new Object({ object: channel, name: channel.name, id: channel.id })));

    // check if the user has admin permission
    if(!msg.member.roles.cache.has(roles.get('admins').object.id)) {
      msg.channel.send("You don't have a permission to run the command!");
      return;
    }
		// get parameters
    const twitch_username = args[1],
          discord_username = msg.mentions.members.first();

    console.log(twitch_username)
    console.log(discord_username)

		// add the user to the role
		discord_username.roles.add(roles.get('streamers').object);

		// create the new channel
		msg.guild.channels.create(twitch_username, { parent: channels.get('/streamers').object });
		msg.channel.send("A new Twitch Streamer channel (" + twitch_username + ") channel was created for " + discord_username + " under /STREAMERS");
  }
});

client.login(discord_token);