function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
	name: 'roll',
	description: 'This will roll a dice randomly',
	execute(msg) {
        msg.channel.send(`Rolling the dice`);
        const roll = Math.floor(Math.random() * 6) + 1
        sleep(2000);
        msg.channel.send(`${roll}`);
	},
};
