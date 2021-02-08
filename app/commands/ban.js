/**
 * Execute on ban command
 * @param {Discord.Message} msg - discord message
 */
const ban = async (msg) => {
    const user = msg.mentions.members.first();
    msg.channel.send(`<@${user.id}> has been banned`);
    user.ban();
};
module.exports = {
    name: "ban",
    description: "This will ban a user from the server",
    usage: "<@username>",
    args: true,
    moderator: true,
    execute: ban,
};
