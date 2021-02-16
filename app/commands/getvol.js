module.exports = {
    name: "getvol",
    description: "This will returns a user voice volume",
    usage: "",
    args: true,
    moderator: false,
    execute: function (msg, args) {
        // get the user.
        const user = msg.mentions.members.first();
        // if user is not exist stop and display a message.
        if (!user) {
            return msg.channel.send(`❌ Sorry, We Couldn't find that member.`);
        }
        console.log(user.voice.connection); // TODO:: here

        // display
        msg.channel.send(
            `<@${user.id}> your current volume : ${user.voice.getVolume}`
        );
    },
};
