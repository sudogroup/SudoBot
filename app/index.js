const { CONFIG_PATH } = require("../config"),
    { DISCORD_TOKEN } = require(`../${CONFIG_PATH}`),
    fs = require("fs"),
    sqlite3 = require("sqlite3").verbose();

// read database
global.db = new sqlite3.Database("./db/all.db");

// redefine sqlite3 functions to support async calls
global.db.getAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.get(sql, function (err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

global.db.allAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all(sql, function (err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

global.db.runAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.run(sql, function (err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// define discord client
const { client } = require("./utils/Discord");

const commandFiles = fs
    .readdirSync("./app/commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

require("./actions/ready").execute(client);
require("./actions/message").execute(client);
require("./actions/reactions").execute(client);

client.login(DISCORD_TOKEN);
