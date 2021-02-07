const { musicQueue } = require("../utils/MusicQueue");
/**
 * Execute on song command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    const serverQueue = musicQueue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send(`There is nothing playing now!`);
    msg.channel.send(
        `${msg.author.toString()}, The current song currently playing is ${
            serverQueue.songs[0].title
        } ${serverQueue.songs[0].url} `
    );
    return undefined;
};
module.exports = {
    name: "song",
    description: "This will get you the information about the current song",
    args: false,
    usage: "song",
    contributor: true,
    execute,
};
