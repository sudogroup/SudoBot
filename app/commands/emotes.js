/**
 * Execute on emotes command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const emotes = async (msg, args) => {
    const emote_arr = msg.guild.emojis.cache.map((e) => e.toString());
    var output = "",
        batch = 1,
        batch_size = args[0];
    if (!batch_size) {
        batch_size = 10;
    }
    for (var i = 0; i < emote_arr.length; i++) {
        output += emote_arr[i];
        if (i == batch_size * batch - 1) {
            msg.author.send(output, { split: true });
            output = "";
            batch += 1;
        }
    }
    if (output) msg.author.send(output);
    msg.reply("I've sent you a DM with all emotes!");
};
module.exports = {
    name: "emotes",
    description: "Send you the set of all emotes in the server",
    execute: emotes,
};
