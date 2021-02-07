/**
 * Execute on server command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    msg.channel.send(
        `\nThis server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`
    );
};
module.exports = {
    name: "server",
    description: "will print some server info!",
    execute,
};
