const users = require("../../../../../data/users.json");
module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const greetings = ["สวัสดี", "หวัดดี", "hello", "hi"];
    if (greetings.includes(message.content)) {
      for (const { id, name } of Object.values(users)) {
        if (message.author.id === id) {
          return message.reply(`หวัดดี${name[0]}`);
        }
      }
      return message.reply("สวัสดีครับ");
    }

    for (const { id, name } of Object.values(users)) {
      if (name.some((n) => message.content === n)) {
        return message.channel.send(`<@${id}>`);
      }
    }
  });
};
