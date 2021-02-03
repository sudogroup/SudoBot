module.exports = {
    name: "mvcha",
    description:
        "Rename/Remove a channel to category",
    args: true,
    usage: "<channel_name> <new_channel_name> <new_category>",
    moderator: true,
    async execute(msg, args) {
        // get parameters
        const channel_name = args[0];
        const new_channel_name = args[1];
        const new_category = args[2];


        // check if parent category null or doesn't exists 
        if(new_channel_name == null || new_channel_name == undefined){
            return msg.channel.send(`Make sure that you fill the new channel`);
        }

        // check if channel exists
        let channel_id = msg.guild.channels.cache.find(channel => channel.name === channel_name);

        if(channel_id == null || channel_id == undefined){
            return msg.channel.send(`❌ There's no channel with this name, try again! `);
        }
        // check if user want to move the channel to another category
        if(new_category){
            // check if category exists
            const givenCategory = msg.client.channels.cache.find((category) => category.name.toLowerCase() === new_category.toLowerCase());
            if(!givenCategory){
                return msg.channel.send(`❌ There's no category with this name, try again!`);
            }

            // rename the channel to the new name
            if(channel_id.setParent(givenCategory.id) && channel_id.setName(new_channel_name)){
                return msg.channel.send(`✅ Channel has been renamed and moved !`);
            }else{
                return msg.channel.send(`❌ Something went wrong, please try again!`);
            }
        }else{
            if(channel_id.setName(new_channel_name)){
                return msg.channel.send(`✅ Channel has been renamed successfully!`);
            }else{
                return msg.channel.send(`❌ Something went wrong, please try again!`);
            }            
        }


        
        

        // await db.runAsync(
        //     `INSERT INTO streamer (streamerDiscordUsername, streamerTwitchUsername, streamerStatus, streamerLastLive) VALUES (${twitch_username},${discord_username},o,-1)`
        // );
    },
};
