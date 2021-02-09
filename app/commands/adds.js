const { getUser } = require("../utils/Twitch");

module.exports = {
    name: "adds",
    description:
        "This will add a streamer to streamers role and create a new channel for the new dude!",
    args: true,
    usage: "<twitch_username> <@discord_username>",
    async execute(msg, args) {
        // get parameters
        const twitch_username = args[0],
            discord_username = msg.mentions.members.first().user.username,
            discord_id = msg.mentions.members.first().user.id,
            twitch_api = await getUser({ username: twitch_username }),
            twitch_id = twitch_api.users[0]._id,
            discord_guild = msg.mentions.members.first();

        // add to the database
        await db.runAsync(
            `INSERT INTO Streamer (streamerDiscordUserName, streamerDiscordUserID, streamerTwitchUserName, streamerTwitchUserID, streamerLive, streamerLastOffline) VALUES ("${discord_username}",${discord_id},"${twitch_username}",${twitch_id},0);`
        );

        // confirm
        msg.channel.send(
            `A new Twitch Streamer channel (${twitch_username}) channel was created for ${discord_guild} under /STREAMERS`
        );
    },
};
