module.exports = {
	name: 'random',
    description: 'This will select a random number',
    usage: '<min> <max>',
	execute(msg, args) {
        let min = 1, max = 10;
        if(args.length >= 1) min = parseInt(args[0])
        if(args.length >= 2) max = parseInt(args[1])
        const random = Math.floor(Math.random() * (max - min + 1) ) + min;
        msg.channel.send(`${random}`);
	},
};
