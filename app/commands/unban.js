module.exports = {
    name: "unban",
    description: "This will unban a user from the server",
    usage: "<@username>",
    args: true,
    moderator: true,
    execute(msg, args) {
        const username = args.join(" ");
        msg.guild.fetchBans().then((bans) => {
            // if there aren't anyone banned
            if (bans.size == 0) return;

            // get banned list
            const banned_user = bans.find(
                (banned) => banned.user.username == username
            );
            // console.log(banned_user)

            // if user wasn't found
            if (!banned_user) return;

            // unban user
            msg.guild.members.unban(banned_user.user);
            msg.channel.send(`<@${banned_user.user.id}> has been unbanned`);
        });
    },
};
