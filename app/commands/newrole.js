/**
 * Execute on newrole command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const newrole = async (msg, args) => {
    // get parameters
    const givenRole = args[0];
    const permissions = args[1];

    // get role by name
    let findRole = msg.guild.roles.cache.find(
        (role) => role.name === givenRole
    );
    // option to store the permissions
    let options;

    if (!findRole) {
        switch (permissions) {
            case "777":
                options = [
                    "ADMINISTRATOR",
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MANAGE_CHANNELS",
                    "MANAGE_GUILD",
                    "ADD_REACTIONS",
                    "VIEW_AUDIT_LOG",
                    "PRIORITY_SPEAKER",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "USE_EXTERNAL_EMOJIS",
                    "VIEW_GUILD_INSIGHTS",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",
                    "USE_VAD",
                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES",
                    "MANAGE_ROLES",
                    "MANAGE_WEBHOOKS",
                    "MANAGE_EMOJIS",
                ];
                break;
            case "755":
                options = [
                    "CREATE_INSTANT_INVITE",
                    "ADD_REACTIONS",
                    "PRIORITY_SPEAKER",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "USE_EXTERNAL_EMOJIS",
                    "VIEW_GUILD_INSIGHTS",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",
                    "USE_VAD",
                    "CHANGE_NICKNAME",
                ];
                break;
            case "744":
                options = [
                    "ADD_REACTIONS",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "USE_EXTERNAL_EMOJIS",
                    "VIEW_GUILD_INSIGHTS",
                    "CONNECT",
                    "SPEAK",
                    "USE_VAD",
                    "CHANGE_NICKNAME",
                ];
                break;
            case "500":
                options = [
                    "ADD_REACTIONS",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "USE_VAD",
                    "CHANGE_NICKNAME",
                ];
                break;
            default:
                options = [
                    "ADD_REACTIONS",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "READ_MESSAGE_HISTORY",
                    "CONNECT",
                    "SPEAK",
                    "USE_VAD",
                ];
        }

        try {
            if (
                msg.guild.roles.create({
                    data: { name: givenRole, permissions: options },
                })
            ) {
                return msg.channel.send(`✅ role has been created`);
            }
        } catch (error) {
            console.error(error.message);
            return msg.channel.send(`❌ ${error.message}`);
        }
    } else {
        return msg.channel.send(`❌ Role exist! please try another name!`);
    }
};
module.exports = {
    name: "newrole",
    description: "Create a new role, based on numbers 777,755,744,500",
    args: true,
    usage: "<role_name> <permissions_number>",
    moderator: true,
    execute: newrole,
};
