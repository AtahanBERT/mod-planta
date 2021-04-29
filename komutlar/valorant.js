const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");

var prefix = ayarlar.prefix;



exports.run = async (bot, message, args) => {
  
     let basarili = ayarlar.basariliemoji;
     let basarisiz = ayarlar.basarisizemoji;
     let yetkili = ayarlar.logger;
     

  
 if (message.author.id == ["286495130096107523","501496194611281921"]);

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      
 rMember.roles.add("832564509909975077")
 message.react('✅')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["valorant"],
  permLevel: 0
};

exports.help = {
  name: "vl",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};