const { musicQueue } = require("../utils/MusicQueue");
/**
 * Execute on stop command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    if (!msg.member.voice.channel)
        return msg.channel.send(
            `${msg.author.tag} You need to be in a voice channel to stop music!`
        );
    const serverQueue = musicQueue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send(`There is nothing playing now!`);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    msg.channel.send(`Music stopped by ${msg.author.toString()}`);
    if (msg.member.voice.channel.leave()) {
        msg.channel.send(`${msg.author.toString()} stop music}`);
    }
};
module.exports = {
    name: "stop",
    description: "This will stop the song",
    args: false,
    usage: "stop",
    contributor: true,
    execute,
};
