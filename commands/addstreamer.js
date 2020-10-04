module.exports = {
	name: 'addstreamer',
	description: 'This will add a streamer to streamers role and create a new channel for the new dude!',
	args: true,
	usage: '<twitch_username> <discord_username>',
	admin: true,
	execute(msg, args) {
		// get all roles and channels
		const roles = new Map(),
			channels = new Map();
		msg.guild.roles.cache.map(role => roles.set(role.name, new Object({ object: role, name: role.name, id: role.id })));
		msg.guild.channels.cache.map(channel => channels.set(channel.name, new Object({ object: channel, name: channel.name, id: channel.id })));

		// check if the user has admin permission
		if(!msg.member.roles.cache.has(roles.get('admins').object.id)) {
			msg.channel.send('You don\'t have a permission to run the command!');
			return;
		}
		// get parameters
		const twitch_username = args[1],
			discord_username = msg.mentions.members.first();

		console.log(twitch_username);
		console.log(discord_username);

		// add the user to the role
		discord_username.roles.add(roles.get('streamers').object);

		// create the new channel
		msg.guild.channels.create(twitch_username, { parent: channels.get('/streamers').object });
		msg.channel.send('A new Twitch Streamer channel (' + twitch_username + ') channel was created for ' + discord_username + ' under /STREAMERS');
	},
};