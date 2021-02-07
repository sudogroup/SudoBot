const { musicQueue } = require("../utils/MusicQueue");
/**
 * Execute on skip command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    if (!msg.member.voice.channel)
        return msg.channel.send(
            `${msg.author.tag} You need to be in a voice channel to stop music!`
        );
    const serverQueue = musicQueue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send(`There is nothing playing now!`);
    if (serverQueue.loop) serverQueue.loop = false;
    serverQueue.connection.dispatcher.end();
    console.log(serverQueue.songs);
    msg.channel.send(`Music skipped by ${msg.author.toString()}`);
    return undefined;
};
module.exports = {
    name: "skip",
    description: "This will skip the song",
    args: false,
    usage: "skip",
    contributor: true,
    execute,
};
