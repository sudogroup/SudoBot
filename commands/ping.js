module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(msg, args) {
		msg.channel.send('Pong.');
	},
};