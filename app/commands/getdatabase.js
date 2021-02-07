module.exports = {
    name: "getdatabase",
    description: "",
    moderator: true,
    async execute(msg, args) {
        const streamerDB = await db.getAsync("SELECT * FROM Streamer");
        // projectDB = await db.getAsync("SELECT * FROM Project"),
        // muteListDB = await db.getAsync("SELECT * FROM MuteList");

        console.log(streamerDB);
        // console.log(projectDB);
        // console.log(muteListDB);
    },
};
