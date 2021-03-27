const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
  let member =
    message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription((`${basarisiz} Bir Kullanıcı Etiketle`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp())
  )
  message.react(basarisiz);
  if (!member.voice.channel)
    return message.channel.send(new Discord.MessageEmbed((`${basarisiz} Bu Kullanıcı Ses Kanalında Değil`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp())
  message.react(basarisiz);
    let seskanali = member.voice.channel.name;

    if (message.member.voice.selfDeaf == true) {
      let sorgu = new Discord.MessageEmbed()
        .setDescription((
          `${basari} ${member} İsimli Kişi **${seskanali}** Ses Kanalında Şuan Aktif Ve Kulaklığı Kapalı`
        ).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
      message.react(basari)
      
      message.channel.send(sorgu);
    } else {
      let sorguu = new Discord.MessageEmbed()
        .setDescription((
          `${basari} ${member} İsimli Kişi **${seskanali}** Ses Kanalında Şuan Aktif Ve Kulaklığı Açık`
        ).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
      message.react(basari)
  
      message.channel.send(sorguu);
    }
  
    if (!member.voice.channel)
      return message.channel.send(new Discord.MessageEmbed((`${basarisiz} Ses Kanalında Yok`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
      message.react(basarisiz)
  };

exports.conf = {
  enabled: true,
  aliases: ["kontrol"],
  permLevel: 0
};

exports.help = {
  name: "sessorgu",
  usage: `sesbilgi`
};