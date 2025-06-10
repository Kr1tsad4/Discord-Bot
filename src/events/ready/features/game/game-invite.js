const tags = require("../../../../../data/tags.json");
module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    for (const [key, value] of Object.entries(tags)) {
      const { keywords, tagIds, tagMessage } = value;

      const matched = keywords?.some((keyword) =>
        keyword === "val" || keyword === "dl"
          ? content.startsWith(keyword.toLowerCase())
          : content === keyword.toLowerCase()
      );

      if (matched) {
        const mentions = tagIds.map((id) => `<@${id}>`).join(" ");
        await message.channel.sendTyping();

        if (key.startsWith("val") || key.startsWith("dl")) {
          const numberString = message.content.slice(key.length).trim();
          const numberToInvite = Number(numberString);

          if (!numberString || isNaN(numberToInvite) || numberToInvite <= 0) {
            await message.channel.send(`${mentions} ${tagMessage}4`);
          } else {
            await message.channel.send(
              `${mentions} ${tagMessage}${Math.round(numberToInvite)}`
            );
          }
        } else {
          await message.channel.send(`${mentions} ${tagMessage}`);
        }

        break;
      }
    }
  });
};
