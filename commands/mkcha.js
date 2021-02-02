module.exports = {
    name: "mkcha",
    description:
        "Create a channel under a category and type",
    args: true,
    usage: "<parent_category> <channel_name> <channel_type>",
    moderator: true,
    async execute(msg, args) {
        const channels = new Map();
        const categories = [];

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

        
        // get all categories.
        channels.forEach(channel => {
            if(channel.name.startsWith('/')){
                categories.push(channel.name);
                // TODO:: run sql command to store categories in Database
            }
        });
        

        // get parameters
        const parent_category = args[0];
        const channel_name = args[1];
        const channel_type = args[2];

        // check if parent category null or doesn't exists 
        if(parent_category == null || parent_category == undefined){
            return msg.channel.send(`Make sure that you fill the parent category`);
        }

        // check if type only text or voice
        if(channel_type === 'voice' || channel_type === 'text'){
            let shouldIBreak = false;
            // check if channel exists!
            channels.forEach(channel => {
                if(channel.name.toLowerCase() === channel_name.toLowerCase()){
                    shouldIBreak = true;
                    return ;
                }
            });

            if(shouldIBreak){
                return msg.channel.send(`Channel exists, Please choose another name 🥰`);
            }

            if(categories.includes(parent_category)){
                // create the new channel
                msg.guild.channels.create(channel_name, {
                    parent: channels.get(parent_category).object,
                    type:channel_type
                });
                // send a message!
                msg.channel.send(
                    `A new channel ${channel_name} 🚀🚀 \n was created, type: ${channel_type}, under: ${parent_category}`
                );
            }

            console.log(parent_category);
            console.log(channel_name);
            console.log(channel_type);
        }else{
            return msg.channel.send(`Channel type must be only text or voice`);
        }


        
        

        // await db.runAsync(
        //     `INSERT INTO streamer (streamerDiscordUsername, streamerTwitchUsername, streamerStatus, streamerLastLive) VALUES (${twitch_username},${discord_username},o,-1)`
        // );
    },
};
