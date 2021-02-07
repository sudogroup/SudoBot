/**
 * Execute on pin command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const execute = async (msg, args) => {
    msg.channel.send(args.join(" ")).then(() => {
        msg.channel.messages
            .fetch({ limit: 1 }, true, true)
            .then((messages) => {
                const lastMessage = messages.last();
                lastMessage.pin();
                console.log(lastMessage.content);
            })
            .catch((err) => {
                console.error(err);
            });
    });
};
module.exports = {
    name: "pin",
    description: "Pins <message>!",
    usage: "<message>",
    contributor: true,
    args: true,
    execute,
};
