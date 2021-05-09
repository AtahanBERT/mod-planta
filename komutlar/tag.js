const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
exports.run = async (bot, message, args) => {
 const istatistikler = new Discord.MessageEmbed()
 message.channel.send(ayarlar.tag)
 message.react(basari)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "tag",
  description: "",
  usage: ""
};