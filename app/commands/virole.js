/**
 * Execute on virole command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const virole = async (msg, args) => {
    // get parameters
    const givenRole = args[0];
    const option = args[1];
    const update = args[2];

    // get role by name
    let findRole = msg.guild.roles.cache.find(
        (role) => role.name === givenRole
    );

    // store the permissions then use this to set permissions in the function.
    let options;

    // check if givenRole exists?
    if (findRole) {
        switch (option) {
            // if user want to update the color
            case "color":
                if (update) {
                    // This expression to verify the user only set a valid Hex number like #85514d
                    if (new RegExp("#[0-9A-Fa-f]{6}").test(update)) {
                        try {
                            if (findRole.setColor(update)) {
                                return msg.channel.send(
                                    `✅ Color has been changed successfully`
                                );
                            }
                        } catch (error) {
                            console.error(`❌ ${error.message}`);
                            return msg.channel.send(`❌ Something went wrong!`);
                        }
                    } else {
                        return msg.channel.send(`❌ Color must be #hex!`);
                    }
                } else {
                    return msg.channel.send(`❌ You must set a color value!`);
                }
                break;
            case "permissions":
                if (update) {
                    switch (update) {
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
                            msg.channel.send(
                                `⚠️ Ammm, We see that you've type a number that not exist, but you know what? because we love you we will process that!`
                            );
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
                        if (findRole.setPermissions(options)) {
                            return msg.channel.send(
                                `✅ Permissions has been changed successfully`
                            );
                        }
                    } catch (error) {
                        console.error(`❌ ${error.message}`);
                        return msg.channel.send(`❌ Something went wrong!`);
                    }
                } else {
                    return msg.channel.send(
                        `❌ You must set a permission value for example 777,755,744,500!`
                    );
                }
                break;
            case "name":
                if (update) {
                    try {
                        if (
                            msg.guild.roles.cache.find(
                                (role) => role.name === update
                            )
                        ) {
                            return msg.channel.send(
                                `❌ Name exists try another one please!`
                            );
                        } else {
                            if (findRole.setName(update)) {
                                console.log("[+] Name has been changed");
                                return msg.channel.send(
                                    `✅ Name has been changed successfully`
                                );
                            }
                        }
                    } catch (error) {
                        console.error(`❌ ${error.message}`);
                        return msg.channel.send(`❌ Something went wrong!`);
                    }
                } else {
                    return msg.channel.send(`❌ You must set a name value!`);
                }
                break;
            default:
                const colorHelp = `color <#hex_color>`,
                    updateHelp = `update <permission> //admin=777, moderator=755, vip=744, default=500`,
                    nameHelp = `name <new_role_name>`;
                return msg.channel.send(
                    `${colorHelp} \n${updateHelp} \n${nameHelp}`
                );
        }
    } else {
        return msg.channel.send(`❌ Role not found!`);
    }
};
module.exports = {
    name: "virole",
    description: "Edit/Update a role",
    args: true,
    usage: "<role_name> <option> <update>",
    moderator: true,
    execute: virole,
};
