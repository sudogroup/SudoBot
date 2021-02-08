/**
 * Execute on args command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const args = async (msg, args) => {
    if (args[0] === "foo") {
        return msg.channel.send("bar");
    }

    msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
};
module.exports = {
    name: "args",
    description: "Information about the arguments provided.",
    execute: args,
};
