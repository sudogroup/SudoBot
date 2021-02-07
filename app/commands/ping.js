/**
 * Execute on ping command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    msg.channel.send("Pong.");
};
module.exports = {
    name: "ping",
    description: "Ping!",
    cooldown: 5,
    execute,
};
