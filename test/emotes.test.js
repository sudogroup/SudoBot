// const cmd = require("../app/commands/ping");

jest.useFakeTimers();
const fs = require("fs"),
    Discord = require("discord.js");

const { client } = require("../app/utils/Discord");
const commandFiles = fs
    .readdirSync("./app/commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`../app/commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
let user, guild, channel, channel_projects, msg;
describe("testing commands", () => {
    beforeAll(() => {
        user = new Discord.User(client, {
            id: Discord.SnowflakeUtil.generate(),
        });
        guild = new Discord.Guild(client, {
            id: Discord.SnowflakeUtil.generate(),
            name: "test_guild_name",
        });
        channel = Discord.Channel.create(
            client,
            {
                id: Discord.SnowflakeUtil.generate(),
                rawPosition: 11,
                topic: null,
                parentID: Discord.SnowflakeUtil.generate(),
                name: "",
                type: 0,
            },
            guild
        );
        channel_projects = Discord.Channel.create(
            client,
            {
                id: Discord.SnowflakeUtil.generate(),
                name: "/projects",
                type: 0,
            },
            guild
        );
        msg = new Discord.Message(
            client,
            {
                id: Discord.SnowflakeUtil.generate(),
                content: "content",
                author: user,
            },
            channel
        );
    });
    var cmd = client.commands.get("emotes");
    it(`test ${cmd.name} - without batch_size`, () => {
        // target
        msg.author.send = jest.fn();
        msg.reply = jest.fn();
        args = [];
        // call execute function
        cmd.execute(msg, args);
        // test if target has been used
        // expect(msg.author.send).toHaveBeenCalled();
        expect(msg.reply).toHaveBeenCalled();
    });
    it(`test ${cmd.name} - with batch_size`, () => {
        // target
        msg.author.send = jest.fn();
        msg.reply = jest.fn();
        args = [10];
        // call execute function
        cmd.execute(msg, args);
        // test if target has been used
        // expect(msg.author.send).toHaveBeenCalled();
        expect(msg.reply).toHaveBeenCalled();
    });
});
