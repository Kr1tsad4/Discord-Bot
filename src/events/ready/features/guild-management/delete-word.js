const deleteWord = require("../../../../../data/delete-word.json");

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (deleteWord.match.some(k => message.content === k)) {
      message.delete();
    }

    if (deleteWord.includes.some(k => message.content.includes(k))) {
      message.delete();
    }
  });
};