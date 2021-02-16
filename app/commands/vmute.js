/**
 * Execute on vmute command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const vmute = async (msg, args) => {
    let defaultTimeToUnmutedUser = 600000; // 10m
    // get all rules
    const roles = new Map();
    msg.guild.roles.cache.map((role) =>
        roles.set(
            role.name,
            new Object({ object: role, name: role.name, id: role.id })
        )
    );
    // get the user.
    const user = msg.mentions.members.first();
    // parse time, if you don't specify the time or enter any unwanted information that will convert to 10second
    let time = parseInt(args[1]);
    if (time == null || isNaN(time)) {
        // you can change the time from here.
        time = defaultTimeToUnmutedUser;
    } else {
        // convert minutes to millisecond
        time = time * 1000 * 60;
    }
    // convert time from millisecond to second to minute

    // if user is not exist stop and display a message.
    if (!user) {
        return msg.channel.send(`❌ Sorry, We Couldn't find that member.`);
    }

    // get and add the "vmuted" role for the user, this is for any searching purposes!
    const muteRole = roles.get("vmuted").object;
    user.roles.add(muteRole);
    // voice mute
    if (user.voice.setMute(true)) {
        //success muting, then display this message
        user.roles.remove(muteRole);
        msg.channel.send(`<@${user.id}> has been muted in the voice channel!`);
    } else {
        return msg.channel.send(`❌ Something went wrong!`);
    }
    // this function for the timer, after amount of time the user no longer be muted in the voice channel. default 10m
    setTimeout(() => {
        // unmute and send message to notify the user.
        user.voice.setMute(false);
        msg.channel.send(`<@${user.id}> has been unvmuted`);
    }, time);
};
module.exports = {
    name: "vmute",
    description: "This will mute a user from speaking for a certain time",
    args: true,
    usage: "<@username> <timeMinutes>",
    moderator: true,
    execute: vmute,
};
