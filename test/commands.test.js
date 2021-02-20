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

const user = new Discord.User(client, { id: 123213 }),
    channel = new Discord.Channel(client, { type: "text" }),
    msg = new Discord.Message(
        client,
        {
            id: "1212312",
            content: "content",
            author: user,
        },
        channel
    );

describe("testing commands", () => {
    var cmd = client.commands.get("ping");
    it(`tests ${cmd.name}`, async () => {
        // target
        msg.channel.send = jest.fn();

        // call execute function
        cmd.execute(msg);

        // test if target has been used
        expect(msg.channel.send).toHaveBeenCalled();
    });
    var cmd = client.commands.get("addproject");
    it(`tests ${cmd.name}`, async () => {
        // target
        msg.channel.send = jest.fn();

        // call execute function
        cmd.execute(msg, args);

        // test if target has been used
        expect(msg.channel.send).toHaveBeenCalled();
    });
});
