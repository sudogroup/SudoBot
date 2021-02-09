const { musicQueue } = require("../utils/MusicQueue");

module.exports = {
    name: "pause",
    description: "This will pause the song",
    args: false,
    usage: "pause",
    contributor: true,
    async execute(msg) {
        if (!msg.member.voice.channel)
            return msg.channel.send(
                `${msg.author.tag} You need to be in a voice channel to pause music!`
            );
        const serverQueue = musicQueue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send(`There is nothing playing now!`);
        if (!serverQueue.playing)
            return msg.channel.send(`The music is already paused now!`);
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        msg.channel.send(`Music paused by ${msg.author.toString()}`);
        return undefined;
    },
};
