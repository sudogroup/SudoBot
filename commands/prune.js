module.exports = {
	name: 'prune',
	description: 'Delete the latest messages, just give it a number!',
	execute(msg, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return msg.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return msg.reply('you need to input a number between 1 and 99.');
		}

		msg.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			msg.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};