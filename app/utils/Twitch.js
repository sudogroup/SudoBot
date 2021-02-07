const { TWITCH_TOKEN } = require("../../.env"),
    fetch = require("node-fetch");

/**
 * Is Live
 * @param {Twitch.User} user - twitch user
 */
const isLive = async ({ user }) => {
    return fetch(`https://api.twitch.tv/kraken/streams/${user._id}`, {
        method: "get",
        headers: {
            "client-id": `${TWITCH_TOKEN}`,
            Accept: `application/vnd.twitchtv.v5+json`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.stream != null) {
                return {
                    name: user.name,
                    game: data.stream.game,
                    url: data.stream.channel.url,
                };
            }
        });
};
/**
 * Get User
 * @param {String} username - twitch username
 */
const getUser = async ({ username }) => {
    return fetch(`https://api.twitch.tv/kraken/users?login=${username}`, {
        method: "get",
        headers: {
            "client-id": `${TWITCH_TOKEN}`,
            Accept: `application/vnd.twitchtv.v5+json`,
        },
    })
        .then((res) => res.json())
        .then(async (data) => {
            return await isLive({ user: data.users[0] });
        });
};

module.exports = {
    isLive,
    getUser,
};
