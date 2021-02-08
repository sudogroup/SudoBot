/**
 * Execute on mute command
 * @param {Discord.Message} msg - discord message
 */
const mute = async (msg) => {
    // get all rules
    const roles = new Map();
    msg.guild.roles.cache.map((role) =>
        roles.set(
            role.name,
            new Object({ object: role, name: role.name, id: role.id })
        )
    );

    // get mentioned user
    const user = msg.mentions.members.first();

    // mute mentioned user
    msg.channel.send(`<@${user.id}> has been muted`);
    const muteRole = roles.get("muted").object;
    user.roles.add(muteRole);
};
module.exports = {
    name: "mute",
    description: "This will mute a user from typing for a certain time",
    usage: "<@username>",
    broadcast: true,
    args: true,
    moderator: true,
    execute: mute,
};
