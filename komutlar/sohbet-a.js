const Discord = require("discord.js");
const db = require("quick.db")
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.logger;


  
  
if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);



  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  let erkek = message.guild.roles.cache.get(ayarlar.erkekrol1);
  let kız = message.guild.roles.cache.get(ayarlar.kızrol1);
  message.channel.createOverwrite(kız, {
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true,
    READ_MESSAGE_HISTORY: true
  });
  

 message.react('✅');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kilit-kapat","sohbet-a","kilit-k"],
  permLevel: 0
};

exports.help = {
  name: 'sohbet-aç',
  description: 'Sohbet Kanalını Açar',
  usage: 'sohbet-aç'
};