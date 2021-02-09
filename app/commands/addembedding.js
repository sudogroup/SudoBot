const Discord = require("discord.js");
/**
 * Execute on addembedding command
 * @param {Discord.Message} msg - discord message
 */
const addembedding = (msg) => {
    const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Streaming");
    msg.channel.send(embed);
};

module.exports = {
    name: "addembedding",
    execute: addembedding,
};
