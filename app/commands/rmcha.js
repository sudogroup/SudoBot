module.exports = {
    name: "rmcha",
    description: "Remove a channel",
    args: true,
    usage: "<channel_name>",
    moderator: true,
    async execute(msg, args) {
        // get parameters
        const channel_name = args[0];

        let channel_id = msg.guild.channels.cache.find(
            (channel) => channel.name === channel_name
        );

        if (channel_id == null || channel_id == undefined) {
            return msg.channel.send(
                `❌ There's no channel with this name, try again! `
            );
        }

        const fetchedChannel = msg.guild.channels.cache.get(channel_id.id);

        if (fetchedChannel.delete()) {
            return msg.channel.send(
                `✅ The channel has been deleted successfully`
            );
        }
    },
};
