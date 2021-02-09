const { musicQueue } = require("../utils/MusicQueue");
/**
 * Execute on resume command
 * @param {Discord.Message} msg - discord message
 */
const resume = async (msg) => {
    if (!msg.member.voice.channel)
        return msg.channel.send(
            `${msg.author.tag} You need to be in a voice channel to resume music!`
        );
    const serverQueue = musicQueue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send(`There is nothing playing now!`);
    if (serverQueue.playing)
        return msg.channel.send(`The music is already playing now!`);
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    msg.channel.send(`Music resumed by ${msg.author.toString()}`);
    return undefined;
};
module.exports = {
    name: "resume",
    description: "This will resume the song",
    args: false,
    usage: "resume",
    contributor: true,
    execute: resume,
};
