module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("ttv")) {
      const ttv = message.content.slice("ttv".length).trim();
      message.reply(`https://www.twitch.tv/${ttv}`);
    }

    if (message.content.toLowerCase().startsWith("tk")) {
      const args = message.content.slice(3).trim();
      const separatorIndex = args.lastIndexOf("#");

      if (separatorIndex === -1) {
        message.reply("tag missing");
        return;
      }
      if (separatorIndex === 0) {
        message.reply("name missing");
        return;
      }
      const nameTk = args.substring(0, separatorIndex).trim();
      const tagTk = args.substring(separatorIndex + 1).trim();

      if (nameTk && tagTk) {
        message.reply(
          `https://tracker.gg/valorant/profile/riot/${nameTk}%23${tagTk}/overview`
        );
      }
    }
  });
};
