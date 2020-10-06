module.exports = {
	name: 'invite',
	description: 'This will an invite link',
	usage: '<time> <usage>',
	contributor: true,
	async execute(msg, args) {
        // get parameters
		let time = 10, // 10 mins
            usage = 1; // only used by one person
        if(args.length == 1){
            time = parseInt(args[0])
        }
        if(args.length == 2){
            usage = parseInt(args[1])
        }
		// console.log(time);
		// console.log(usage);

        // create an invite link
        const invite = await msg.channel.createInvite(
            {
              maxAge: time * 60, // maximum time for the invite, in seconds
              maxUses: usage // maximum times it can be used
            },
            `Requested with command by ${msg.author.tag}`
        )
		msg.channel.send(invite ? `Here's your invite: ${invite} for ${time}mins and ${usage} usage.` : "There has been an error during the creation of the invite.");
	},
};
