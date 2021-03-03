/**
 * Execute on message events
 * @param {Discord.Client} client - discord client
 */
const welcome = (client) => {
    client.on("guildMemberAdd", (member) => {
        member.guild.channels.cache.get("713903615823314944").send("Welcome");
    });
};

module.exports = { execute: welcome };
