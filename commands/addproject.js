module.exports = {
	name: 'addproject',
	description: 'This will add a new project Channel!',
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
		const project = args[1];
		console.log(project);

		// create the new channel
		msg.guild.channels.create(project, { parent: channels.get('/projects').object });
		msg.channel.send('A new project channel was created for ' + project);
	},
};