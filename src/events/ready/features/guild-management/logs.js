const channels = require('../../../../../../../data/channels.json')
module.exports = (client) => {
  client.on("messageDelete", (deletedMessage) => {
    const deletedContent = deletedMessage.content;
    const deletedAuthor = deletedMessage.author.tag;
    console.log(
      `[${new Date().toLocaleString()}] Message by ${deletedAuthor} was deleted. Content: "${deletedContent}"`
    );
  });

  client.on("messageCreate", async (message) => {
    console.log(
      `[${new Date().toLocaleString()}] Channel: ${message.channel.name}(${
        message.channel.id
      })| User: ${message.author.tag} (${message.author.id}) sent: "${
        message.content
      }"`
    );

    
    const channel = client.channels.cache.get(channels.main.id);
    if (message.content === "!log") {
      if (channel) {
        channel.messages
          .fetch({ limit: 50 })
          .then((messages) => {
            messages.forEach((message) => {
              const messageTimestamp = message.createdAt.toLocaleString();
              console.log(
                `[${messageTimestamp}] Channel : ${channel.name} (${channel.id}) | User : ${message.author.tag}: ${message.content}`
              );
            });
          })
          .catch(console.error);
      }
    }
  });
};
