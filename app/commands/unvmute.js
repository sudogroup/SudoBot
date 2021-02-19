/**
 * Execute on unvmute command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const unvmute = async (msg, args) => {
    // get the user.
    const user = msg.mentions.members.first();
    // if user is not exist stop and display a message.
    if (!user) {
        return msg.channel.send(
            `❌ Sorry ${msg.author.toString()}, We Couldn't find that member.`
        );
    }
    if (!user.voice.channel) {
        return msg.channel.send(
            `❌ ${msg.author.toString()} Given user not in any voice channel.`
        );
    }

    // get all rules
    const roles = new Map();
    msg.guild.roles.cache.map((role) =>
        roles.set(
            role.name,
            new Object({
                object: role,
                name: role.name,
                id: role.id,
            })
        )
    );

    // voice unmute
    if (user.voice.setMute(false)) {
        const muteRole = roles.get("vmuted").object;
        //success unmute, then display this message
        user.roles.remove(muteRole);
        msg.channel.send(`<@${user.id}> has been unmute in the voice channel!`);
    } else {
        return msg.channel.send(
            `❌ ${msg.author.toString()} Something went wrong!`
        );
    }
};
module.exports = {
    name: "unvmute",
    description: "This will unmute a user from speaking",
    usage: "<@username>",
    moderator: true,
    args: true,
    execute: unvmute,
};
