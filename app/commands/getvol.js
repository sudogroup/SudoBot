/**
 * Execute on getvol command
 * @param {Discord.Message} msg - discord message
 */
const getvol = async (msg) => {
    const { musicQueue } = require("../utils/MusicQueue");
    // check if user in the voice channel
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        return msg.channel.send(
            `${msg.author.tag} You need to be in a voice channel to decrease volume!`
        );
    }
    const serverQueue = musicQueue.get(msg.guild.id);
    let vol = serverQueue.connection.dispatcher;
    // display all types of volume
    msg.channel.send(
        `Current Bot Volume : ${vol.volume * 100},
            Logarithmic Volume : ${vol.volumeLogarithmic},
            Decibels Volume : ${vol.volumeDecibels},
            Editable Volume : ${vol.volumeEditable}`
    );
};

module.exports = {
    name: "getvol",
    description: "This will returns the bot voice volume",
    usage: "",
    args: false,
    moderator: false,
    execute: getvol,
};
