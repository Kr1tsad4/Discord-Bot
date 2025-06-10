const users = require("../../../../../data/users.json");
const channels = require("../../../../../data/channels.json");
module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelToSend = client.channels.cache.get(channels.main.id);
    const content = message.content.slice("!send".length).trim();
    const idTag = null;
    if (message.author.id !== users.me.id) return;
    if (message.content.startsWith("!send")) {
      if (channelToSend) {
        channelToSend.send(content);
      }
    }
    if (message.content.startsWith("!tag")) {
      if (channelToSend) {
        channelToSend.send(`<@${idTag}>`);
      }
    }
  });
};
