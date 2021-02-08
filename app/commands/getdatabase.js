/**
 * Execute on getdatabase command
 * @param {Discord.Message} msg - discord message
 */
const getdatabase = async (msg, args) => {
    const streamerDB = await db.getAsync("SELECT * FROM Streamer");
    // projectDB = await db.getAsync("SELECT * FROM Project"),
    // muteListDB = await db.getAsync("SELECT * FROM MuteList");

    console.log(streamerDB);
    // console.log(projectDB);
    // console.log(muteListDB);
};
module.exports = {
    name: "getdatabase",
    description: "",
    moderator: true,
    execute: getdatabase,
};
