/**
 * Execute on kick command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    const user = msg.mentions.members.first();
    msg.channel.send(`<@${user.id}> has been kicked`);
    user.kick();
};
module.exports = {
    name: "kick",
    description: "This will kick a user from the server",
    usage: "<@username>",
    args: true,
    moderator: true,
    execute,
};
