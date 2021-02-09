const { CONFIG_PATH } = require("../../.env"),
    { BITLY_TOKEN } = require(`../../${CONFIG_PATH}`),
    BitlyClient = require("bitly").BitlyClient,
    bitly = new BitlyClient(BITLY_TOKEN);

module.exports = {
    name: "short",
    description: "This will shorten a link",
    args: true,
    usage: "<url>",
    contributor: true,
    async execute(msg, args) {
        // get parameters
        const url = args[0]; // only used by one person

        // create an invite link
        const response = await bitly.shorten(url).catch(console.log);
        msg.channel.send(`Your shortened bitlink is ${response.link}`);
    },
};
