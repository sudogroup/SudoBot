const {
    Message
} = require('discord.js');
const ytdl = require('ytdl-core');
const { musicQueue } = require('../assets/musicQueue.js');

module.exports = {
    name: 'repeat',
    description: 'This will repeat the current song',
    args: false,
    usage: 'repeat',
    contributor: true,
    async execute(msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${msg.author.tag} You need to be in a voice channel to stop music!`);
        const serverQueue = musicQueue.get(msg.guild.id)
        if(!serverQueue) return msg.channel.send(`There is nothing playing now!`);
        // if(serverQueue.loop == true){
        //     return msg.channel.send(`${serverQueue.songs[0].title} currently repeated, **!sudo skip** to disable the repeat mood `)
        // }
        serverQueue.loop = !serverQueue.loop
        msg.channel.send(`Music repeated by ${msg.author.toString()}`)
    },
};