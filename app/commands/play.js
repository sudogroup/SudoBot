const { musicQueue } = require("../utils/MusicQueue"),
    ytdl = require("ytdl-core");

/**
 * Play action
 * @param {Discord.Guild} guild - discord guild
 * @param {Queue} song - song queue
 * @param {Discord.Message} msg - discord message
 */
const play = (guild, song, msg) => {
    const serverQueue = musicQueue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        musicQueue.delete(guild.id);
        return;
    }
    // join the voice channel and play the url using ytdl
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            if (!serverQueue.loop) serverQueue.songs.shift();
            console.log(musicQueue);
            play(guild, serverQueue.songs[0], msg);
        })
        .on("error", (error) => {
            console.error(`${error}`);
        });
    // volume == 100 (right 50 and left 50)
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    if (dispatcher) {
        console.log(`Here, at ${msg.channel.name}`);
        msg.channel.send(
            `${msg.author.toString()} playing (${
                (guild, serverQueue.songs[0].title)
            })`
        );
    }
};

/**
 * Execute on play command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const execute = async (msg, args) => {
    // get parameters
    const url = args[0]; // only used by one person
    console.log(url);
    console.log(msg.author.tag);

    const serverQueue = musicQueue.get(msg.guild.id);

    // get the user voice channel then handle all cases like if bot has permission to join this voice channel..etc
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
        return msg.channel.send(
            `${msg.author.tag} You need to be in a voice channel to play music!`
        );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT"))
        return msg.channel.send(
            `I don't have permissions to connect to the voice channel`
        );
    if (!permissions.has("SPEAK"))
        return msg.channel.send(
            `I don't have permissions to speak in the channel`
        );

    const songInfo = await ytdl.getInfo(url);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };
    if (!serverQueue) {
        const queueConstract = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
            loop: false,
        };
        musicQueue.set(msg.guild.id, queueConstract);
        console.log("music", musicQueue);
        queueConstract.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstract.connection = connection;
            console.log(queueConstract.songs[0]);
            console.log(musicQueue);

            play(msg.guild, queueConstract.songs[0], msg);
        } catch (error) {
            console.error(
                `There was an error connecting to the voice channel : ${error}`
            );
            musicQueue.delete(msg.guild.id);
            return msg.channel.send(
                `There was an error connecting to the voice channel : ${error}`
            );
        }
    } else {
        serverQueue.songs.push(song);
        return msg.channel.send(
            `**${song.title}** has been added to the queue`
        );
    }
    return undefined;
};
module.exports = {
    name: "play",
    description: "This will play a song",
    args: true,
    usage: "<url>",
    contributor: true,
    execute,
};
