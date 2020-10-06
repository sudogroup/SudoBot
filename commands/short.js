const BitlyClient = require('bitly').BitlyClient;
const { bitlyToken } = require('../assets/config/config.json');
const bitly = new BitlyClient(bitlyToken);

module.exports = {
	name: 'short',
    description: 'This will shorten a link',
    args: true,
	usage: '<url>',
	contributor: true,
	async execute(msg, args) {
        console.log(bitlyToken)
        // get parameters
		const url = args[0]; // only used by one person
		console.log(url);

        // create an invite link
        const response = await bitly.shorten(url).catch(console.log);
		msg.channel.send(`Your shortened bitlink is ${response.link}`);
	},
};
