module.exports = {
	name: 'kick',
	description: 'This will kick a user from the server',
	usage: '<@username>',
	args: true,
	moderator: true,
	execute(msg, args) {
		const user = msg.mentions.members.first();
		msg.channel.send(`<@${user.id}> has been kicked`);
		user.kick();
    },
};
