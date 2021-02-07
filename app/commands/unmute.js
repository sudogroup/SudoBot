/**
 * Execute on unmute command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
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

    // unmute mentioned user
    msg.channel.send(`<@${user.id}> has been unmuted`);
    const muteRole = roles.get("muted").object;
    user.roles.remove(muteRole);
};
module.exports = {
    name: "unmute",
    description: "This will unmute a user from typing for a certain time",
    usage: "<@username>",
    args: true,
    moderator: true,
    execute,
};
