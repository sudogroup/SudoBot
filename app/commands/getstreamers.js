/**
 * Execute on getstreamers command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const getstreamers = async (msg, args, test = true) => {
    // get all roles and channels
    const roles = new Map(),
        channels = new Map();
    msg.guild.roles.cache.map((role) =>
        roles.set(
            role.name,
            new Object({ object: role, name: role.name, id: role.id })
        )
    );
    msg.guild.channels.cache.map((channel) =>
        channels.set(
            channel.name,
            new Object({
                object: channel,
                name: channel.name,
                id: channel.id,
            })
        )
    );

    // get parameters
    const twitch_username = args[0],
        discord_username = msg.mentions.members.first();

    console.log(twitch_username);
    console.log(discord_username);

    // add the user to the role
    discord_username.roles.add(roles.get("streamers").object);

    // create the new channel
    msg.guild.channels.create(twitch_username, {
        parent: channels.get("/streamers").object,
    });
    msg.channel.send(
        `A new Twitch Streamer channel (${twitch_username}) channel was created for ${discord_username} under /STREAMERS`
    );
    if (!test) {
        await db.runAsync(
            `INSERT INTO streamer (streamerDiscordUsername, streamerTwitchUsername, streamerStatus, streamerLastLive) VALUES (${twitch_username},${discord_username},o,-1)`
        );
    }
};
module.exports = {
    name: "getstreamers",
    description: "",
    moderator: true,
    execute: getstreamers,
};
