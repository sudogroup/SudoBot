module.exports = {
    name: "addproject",
    description: "This will add a new project channel!",
    args: true,
    usage: "<project>",
    contributor: true,
    async execute(msg, args) {
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
        const project = args[0];

        // create the new channel
        msg.guild.channels.create(project, {
            parent: channels.get("/projects").object,
        });
        msg.channel.send("A new project channel was created for " + project);
        // still missing creating a role
        await db.runAsync(
            `INSERT INTO project (projectName, projectRole) VALUES ('${project}',0)`
        );
    },
};
