const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder } = require("@discordjs/builders");
const {
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const tags = require("../../../../../data/tags.json");
const users = require("../../../../../data/users.json");

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.startsWith("vab")) {
      await handleVabCommand(message);
      return;
    }

  });

  const getUserDisplayName = (userId) => {
    const user = Object.values(users).find(u => u.id === userId);
    return user ? user.name[1] : null; 
  }

  const handleVabCommand = async (message) => {
    const vlTag = tags.val.tagIds.map(id => `<@${id}>`).join(" ");
    let numberToInviteVal = Math.round(
      Number(message.content.slice("vab".length).trim())
    );

    if (numberToInviteVal > 4 || numberToInviteVal === 0) {
      numberToInviteVal = 4;
    }

    if (
      isNaN(numberToInviteVal) ||
      numberToInviteVal <= 0 ||
      numberToInviteVal > 1000000
    ) {
      return;
    }

    const firstButton = new ButtonBuilder()
      .setLabel("เล่น!")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("play-button");

    const secondButton = new ButtonBuilder()
      .setLabel("ไม่เล่นละ")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("not-play-button");

    const thirdButton = new ButtonBuilder()
      .setLabel("มีใครแล้วบ้าง")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("player-button");

    const buttonRow = new ActionRowBuilder().addComponents(
      firstButton,
      secondButton,
      thirdButton
    );

    const reply = await message.reply({
      content: `${vlTag} ${tags.val.tagMessage}${numberToInviteVal}`,
      components: [buttonRow],
    });

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });

    const player = [];
    let py = 1;
    
    const authorName = getUserDisplayName(message.author.id) || message.author.username;
    player.push({ id: message.author.id, name: authorName });

    if (numberToInviteVal < 5) {
      for (let i = numberToInviteVal; i < 4; i++) {
        player.push({ id: null, name: `ผู้เล่นปริศนา${py}` });
        py++;
      }
    }

    let status = 1;

    collector.on("collect", async (interaction) => {
      const userId = interaction.user.id;
      const userName = getUserDisplayName(userId) || interaction.user.username;

      if (interaction.customId === "play-button") {
        if (player.some((e) => e.id === userId)) return;
        
        const count = player.length;
        if (count >= 5) {
          interaction.reply(`เต็มละ`);
          return;
        }
        
        if (count <= numberToInviteVal) {
          interaction.reply(`${userName}เล่น`);
          player.push({ id: userId, name: userName });
          status >= 1 ? (status = 1) : status++;
          console.log(status);
          return;
        } else if (count > numberToInviteVal) {
          interaction.reply(`เต็มละ`);
          return;
        }
      }

      if (interaction.customId === "player-button") {
        if (status === 0) return;
        
        if (player.length > 0) {
          const playerList = player.map((p) => p.name).join("  ");
          interaction.reply({
            content: `<@${userId}> กดดู Party : มี${playerList}`,
          });
          status < 0 ? (status = 0) : status--;
          console.log(status);
        } else {
          interaction.reply("ยังไม่มี");
        }
        return;
      }

      if (interaction.customId === "not-play-button") {
        const updatedPlayers = player.filter((e) => e.id !== userId);
        const checkPlayer = player.find((f) => f.id === userId);
        
        if (!checkPlayer) return;
        
        player.length = 0;
        player.push(...updatedPlayers);
        interaction.reply(`${userName}ไม่เล่นแล้ว`);
        status >= 1 ? (status = 1) : status++;
        console.log(status);
      }
    });
  }
};