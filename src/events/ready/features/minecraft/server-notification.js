const { checkServerInfo } = require("./server-status");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() === "!mc") {
      const status = await checkServerInfo();
      if (status.online) {
        const { playersOnline, players, playersMax, version } = status;
        await message.channel.sendTyping();
        message.reply(
          `🟢 **SERVER ONLINE**\n**Online Players**: ${playersOnline}/${playersMax}\n**In-game**: ${
            players.length === 0 ? "-" : players.map((p) => p.name).join(", ")
          }\n**Version**: ${version}`
        );
      } else {
        await message.channel.sendTyping();
        message.reply("🔴 **SERVER OFFLINE**");
      }
    }
  });
};
