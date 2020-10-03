module.exports = {
	name: 'avatar',
	description: 'Get links of users AVATARs!',
	usage: 'blank for your AV, <user> or <user> <user> <user> <user> to get multiple users\' avatars',
	aliases: ['icon', 'pfp'],

	execute(msg) {
		if (!msg.mentions.users.size) {
			return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}

		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		msg.channel.send(avatarList);

	},
};