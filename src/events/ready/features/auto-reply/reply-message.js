const wordToReply = require("../../../../../data/reply-word.json");

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    for (const [key, value] of Object.entries(wordToReply)) {
      const { keywords, replies, excludes } = value;
      const hasExcluded = excludes?.some((ex) => message.content.includes(ex));
      if (hasExcluded) continue;
      const matched = keywords.some(
        (keyword) =>
          message.content.includes(keyword) || message.content === keyword
      );
      if (matched) {
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        if (
          key === "randomReplies1" ||
          key === "randomReplies2" ||
          key === "randomReplies3"
        ) {
          return message.reply(randomReply);
        } else {
          return message.channel.send(randomReply);
        }
      }
    }
  });
};
