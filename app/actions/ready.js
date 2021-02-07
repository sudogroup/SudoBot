const { getUser } = require("../utils/Twitch"),
    Discord = require("discord.js");
/**
 * Execute on ready event
 * @param {Discord.Client} client - discord client
 */
const execute = (client) => {
    client.on("ready", async () => {
        const usersStreamers = [
                "sudomaze",
                "doul20",
                "bufai7an",
                "mutlaq_777",
                "Javix64",
                "iiMISHARI",
                "Abady",
                "data__love",
                "nnn1",
                "htooony7",
            ],
            msgId = "805387690807787520",
            channelId = "747883613508468760",
            emojiId = "765412444524773386";
        console.log(`Logged in as ${client.user.tag}!`);

        // TODO: this code is outdated, it should be updated to work with the new refactor of the codebase
        // setInterval(() => {
        //     const channel = client.channels.cache.get(channelId),
        //         emoji = client.emojis.cache.get(emojiId);
        //     // update twitch
        //     const embed = new Discord.MessageEmbed()
        //         .setColor("#0099ff")
        //         .setTitle("Streaming");
        //     channel.messages
        //         .fetch(msgId)
        //         .then((message) => message.edit(embed))
        //         .catch(console.error);

        //     usersStreamers.forEach(async (usersStreamer) => {
        //         const user = await getUser({ username: usersStreamer });
        //         if (user) {
        //             embed.addFields({
        //                 name: `${emoji}`,
        //                 value: `[${user.name}](${user.url}) \n ${user.game}`,
        //                 inline: true,
        //             });
        //             channel.messages
        //                 .fetch(msgId)
        //                 .then((message) => message.edit(embed))
        //                 .catch(console.error);
        //         }
        //     });
        // }, 60000);
    });
};

module.exports = { execute };
