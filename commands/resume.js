const { Message } = require("discord.js");
const ytdl = require("ytdl-core");

const { musicQueue } = require("../assets/musicQueue.js");

module.exports = {
    name: "resume",
    description: "This will resume the song",
    args: false,
    usage: "resume",
    contributor: true,
    async execute(msg) {
        if (!msg.member.voice.channel)
            return msg.channel.send(
                `${msg.author.tag} You need to be in a voice channel to resume music!`
            );
        const serverQueue = musicQueue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send(`There is nothing playing now!`);
        if (serverQueue.playing)
            return msg.channel.send(`The music is already playing now!`);
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        msg.channel.send(`Music resumed by ${msg.author.toString()}`);
        return undefined;
    },
};
