/**
 * Execute on vkick command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const { client } = require("../utils/Discord");
const vkick = async (msg, args) => {
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

    let botName = client.user.username;
    let isGivenBOT = user.user.bot;
    if (botName && isGivenBOT) {
        const serverQueue = musicQueue.get(msg.guild.id);
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        if (msg.member.voice.channel.leave()) {
            return msg.channel.send(
                `<@${user.id}> <bot> has been kicked from the voice channel!`
            );
        }
    }
    // console.log(msg);
    // voice unmute
    if (user.voice.kick()) {
        msg.channel.send(
            `<@${user.id}> has been kicked from the voice channel!`
        );
    } else {
        return msg.channel.send(
            `❌ ${msg.author.toString()} Something went wrong!`
        );
    }
};
module.exports = {
    name: "vkick",
    description: "This will kick a user from voice channel",
    args: true,
    usage: "<@username>",
    moderator: true,
    execute: vkick,
};
