require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");
const { CommandKit } = require("commandkit");
const {
  checkServerStatus,
} = require("./events/ready/features/minecraft/server-status");
const channels = require("../data/channels.json");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  devGuildIds: [process.env.GUILD_ID1, process.env.GUILD_ID2],
  eventsPath: `${__dirname}/events`,
});

client.once("ready", async () => {
  console.log(`${client.user.tag} is online`);
  client.user.setActivity({
    name: "reels",
    type: ActivityType.Watching,
  });
  const channel = await client.channels.fetch(channels.main.id);
  setInterval(() => checkServerStatus(channel), 5000);
});

client.login(process.env.TOKEN);
