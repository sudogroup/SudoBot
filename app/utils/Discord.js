const Discord = require("discord.js"),
    client = new Discord.Client({
        partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
    });

client.commands = new Discord.Collection();

module.exports = { client };
