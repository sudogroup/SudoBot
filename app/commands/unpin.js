/**
 * Execute on unpin command
 * @param {Discord.Message} msg - discord message
 * @param {Array} args - passed arguments
 */
const unpin = async (msg, args) => {
    console.log("Searching for " + args.join(","));

    msg.channel.messages
        .fetchPinned(false)
        .then((pinned_messages) => {
            let found_messages = new Array();
            let unpinned_messages_counter = 0;

            if (args[0] === "ALL") {
                found_messages = pinned_messages;
                unpinned_messages_counter = found_messages.size;
            } else {
                console.log(
                    `We have ${pinned_messages.size} messages and ${args.length} keywords`
                );
                pinned_messages.forEach((element) => {
                    let all_words_found = true;
                    console.log(`Searching ${element} for ${args.length}`);
                    args.forEach((search_word) => {
                        if (
                            !element.content
                                .toLowerCase()
                                .includes(search_word.toLowerCase())
                        ) {
                            all_words_found = false;
                        }
                    });
                    if (all_words_found) {
                        found_messages.push(element);
                        unpinned_messages_counter += 1;
                    }
                });
            }

            console.log(`Received ${pinned_messages.size} messages`);

            if (unpinned_messages_counter > 0) {
                msg.channel.send(
                    `Unpinned ${unpinned_messages_counter} messages`
                );
                found_messages.forEach((to_unpin) => {
                    to_unpin.unpin();
                });
            } else {
                msg.channel.send("No messages matching criteria");
            }
        })
        .catch(console.error);
};
module.exports = {
    name: "unpin",
    description:
        "Unpins a message or messages by giving partial contant of the message, or the word ALL to unpin all messages!",
    usage: " <partial content> or ALL",
    contributor: true,
    args: true,
    execute: unpin,
};
