/**
 * Execute on move command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const move = async (msg, args) => {
    // get the user and channel name.
    const user = msg.mentions.members.first();
    let channelName = args[1];
    // if user is not exist stop and display a message.
    if (!user) {
        return msg.channel.send(`❌ Sorry, We Couldn't find that member.`);
    }
    // check if user enter a channel name
    if (channelName == null) {
        return msg.channel.send(
            `❌ Sorry, You MUST enter the channel name and make sure the type of channel 'voice' !`
        );
    }

    // check if channel exist, or display a message.
    const channel = msg.guild.channels.cache.find(
        (channel) => channel.name === channelName && channel.type === "voice"
    );

    if (!channel) {
        return msg.channel.send(`❌ Sorry, We Couldn't find the channel!`);
    }

    if (!user.voice.channel) {
        return msg.channel.send(`❌ Sorry, ${user} not connected to any voice channel now!!`);
    }

    // everything is cool! move the member to target channel!
    if (user.voice.setChannel(channel)) {
        //success moving, then display this message
        return msg.channel.send(
            `✅ <@${user.id}> has been moved to ${channelName} channel!`
        );
    } else {
        return msg.channel.send(`❌ Something went wrong!`);
    }
};
module.exports = {
    name: "move",
    description: "This will move a user from channel to another channel",
    args: true,
    usage: "<@username> <channel-name>",
    moderator: true,
    execute: move,
};
