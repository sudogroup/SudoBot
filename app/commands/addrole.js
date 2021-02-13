/**
 * Execute on addrole command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const addrole = async (msg, args) => {
    // get parameters
    const givenRole = args[0];
    const member = msg.mentions.members.first();

    // get role by name
    let findRole = msg.guild.roles.cache.find(
        (role) => role.name === givenRole
    );

    if (member) {
        if (findRole) {
            // check if user has this role
            if (member.roles.cache.has(findRole.id)) {
                return msg.channel.send(`❌ ${member} already has this role!`);
            } else {
                try {
                    if (member.roles.add(findRole.id)) {
                        return msg.channel.send(
                            `✅ ${givenRole} has been added to ${member}`
                        );
                    }
                } catch (error) {
                    return msg.channel.send(`❌ ${error.message}`);
                }
            }
        } else {
            return msg.channel.send(`❌ Role not found`);
        }
    } else {
        return msg.channel.send(`❌ User not found`);
    }
};
module.exports = {
    name: "addrole",
    description: "Add role to given user",
    args: true,
    usage: "<role> <@user>",
    moderator: true,
    execute: addrole,
};
