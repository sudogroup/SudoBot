/**
 * Execute on incvol command
 * @param {Discord.Message} msg - discord message
 */
const incvol = async (msg) => {
    // check if user in the voice channel
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        return msg.channel.send(
            `${msg.author.toString()} You need to be in a voice channel to decrease volume!`
        );
    }

    let clientVoiceConnection = msg.guild.voice.connection;
    if (!clientVoiceConnection) {
        return msg.channel.send(`❌ Bot must be in voice channel`);
    }

    let percentage = 25 / 100; // if you want to use args just adjust the "25" to argument variable.

    const serverQueue = musicQueue.get(msg.guild.id);
    let volume = serverQueue.connection.dispatcher.volume + percentage;

    if (serverQueue.connection.dispatcher.setVolume(volume)) {
        msg.channel.send(`${msg.author.toString()} Voice has been increased.`);
    } else {
        msg.channel.send(
            `${msg.author.toString()} Voice has not been increased, please try again!`
        );
    }
};

module.exports = {
    name: "incvol",
    description: "This will increase the bot voice volume by 25",
    usage: "",
    args: false,
    moderator: false,
    execute: incvol,
};
