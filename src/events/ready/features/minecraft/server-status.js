const fs = require("fs");
const path = require("path");
const { status } = require("minecraft-server-util");
const statusFile = path.resolve(
  __dirname,
  "../../../../../data/mc-server-status.json"
);
let mcServerStatus = null;

if (fs.existsSync(statusFile)) {
  try {
    const raw = fs.readFileSync(statusFile, "utf-8");
    mcServerStatus = JSON.parse(raw);
  } catch (e) {
    mcServerStatus = null;
  }
}

const checkServerStatus = async (channelToSend) => {
  let currentStatus = null;

  try {
    await status(process.env.MC_IP, Number(process.env.MC_PORT));
    currentStatus = { online: true };
  } catch (error) {
    currentStatus = { online: false };
  }

  if (!mcServerStatus || mcServerStatus.online !== currentStatus.online) {
    const message = currentStatus.online
      ? "🟢 **MINECRAFT SERVER ONLINE !!!**"
      : "🔴 **MINECRAFT SERVER OFFLINE**";
    await channelToSend.send(message);
    fs.writeFileSync(statusFile, JSON.stringify(currentStatus), "utf-8");
    console.log(message);
  }

  mcServerStatus = currentStatus;
};

const checkServerInfo = async () => {
  try {
    const res = await status(process.env.MC_IP, Number(process.env.MC_PORT));
    return {
      online: true,
      playersOnline: res.players.online,
      players: res.players.sample || [],
      playersMax: res.players.max,
      version: res.version.name,
    };
  } catch (error) {
    return { online: false };
  }
};

module.exports = {
  checkServerStatus,
  checkServerInfo,
};
