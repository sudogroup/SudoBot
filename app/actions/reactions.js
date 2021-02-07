module.exports = {
    execute(client) {
        client.on("messageReactionAdd", async (reaction, user) => {
            // When we receive a reaction we check if the reaction is partial or not
            if (reaction.partial) {
                // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error(
                        "Something went wrong when fetching the message: ",
                        error
                    );
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }
            const roles = new Map();
            reaction.message.guild.roles.cache.map((role) =>
                roles.set(
                    role.name,
                    new Object({ object: role, name: role.name, id: role.id })
                )
            );

            // Now the message has been cached and is fully available
            if (reaction.message.channel.id == "777245119837110275") {
                // Assign the role
                const member = await reaction.message.guild.members.fetch(user);
                await member.roles.add(roles.get("basic").object);
                await member.roles.remove(roles.get("tmp").object);
                console.log("added rules reaction");
            }
        });

        // This basically will never work, since the user will not see the channel after they accept the rules
        // Admins can use this function to test role assignment and removal
        client.on("messageReactionRemove", async (reaction, user) => {
            // When we receive a reaction we check if the reaction is partial or not
            if (reaction.partial) {
                // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error(
                        "Something went wrong when fetching the message: ",
                        error
                    );
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }

            const roles = new Map();
            reaction.message.guild.roles.cache.map((role) =>
                roles.set(
                    role.name,
                    new Object({ object: role, name: role.name, id: role.id })
                )
            );

            // Now the message has been cached and is fully available
            if (reaction.message.channel.id == "777245119837110275") {
                // Remove the role
                const member = await reaction.message.guild.members.fetch(user);
                await member.roles.remove(roles.get("basic").object);
                await member.roles.add(roles.get("tmp").object);
                console.log("removed rules reaction");
            }
        });
    },
};
