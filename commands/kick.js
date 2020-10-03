module.exports = {
	name: 'kick',
	description: 'Kick a user from the server!',
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(msg) {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		if (!msg.mentions.users.size) {
			return msg.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = msg.mentions.users.first();
		// Enable once permissions are set properly
		// member.kick();

		msg.channel.send(`You wanted to kick: ${taggedUser.username}`).then(sentMessage => {
			sentMessage.react('👍');
		});
	},
};