const Discord = require("discord.js");

module.exports = {
    name: "addembedding",
    execute(msg, args) {
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Streaming");
        msg.channel.send(embed);
    },
};
