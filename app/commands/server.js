module.exports = {
    name: "server",
    description: "will print some server info!",
    execute(msg) {
        msg.channel.send(
            `\nThis server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`
        );
    },
};
