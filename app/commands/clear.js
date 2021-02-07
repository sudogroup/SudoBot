/**
 * Execute on clear command
 * @param {Discord.Message} msg - discord message
 */
const execute = async (msg) => {
    // The plan is to keep fetching messages from the target channel until no more messages are coming
    function deleteMessages(number) {
        const limit = 1;
        console.log(`calling deleteMessages number: ${number}`);
        msg.channel.messages
            .fetch({ limit: limit }, false, true)
            .then(async (messages) => {
                if (messages.size > 0) {
                    const lastMessage = messages.first();
                    await msg.channel.messages.delete(lastMessage.id);

                    console.log(`${lastMessage.id} messages deleted.`);

                    deleteMessages(number + 1);
                }
            });
    }

    deleteMessages(1);
};
module.exports = {
    name: "clear",
    description: "Delete all messages in a channel where command is executed!",
    usage: "",
    contributor: true,
    execute,
};
