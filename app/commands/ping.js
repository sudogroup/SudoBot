module.exports = {
    name: "ping",
    description: "Ping!",
    cooldown: 5,
    execute(msg) {
        msg.channel.send("Pong.");
    },
};
