const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;



exports.run = async (client, message, args) => {
 
 

      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let yetkili = ayarlar.logger;

  
 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));


  let rMember = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
    if (!rMember) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol almam için bir kişiyi etiketlemelisin!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let role = message.mentions.roles.first();

        if(message.member.roles.highest.position <= rMember.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (!role) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol alabilmem için rolü belirtmelisiniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let aRole = message.mentions.roles.first();
    if (!aRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Etiketlediğiniz rolü sunucuda bulamıyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.comparePositionTo(role) < 1) 
  return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Bu rol senden daha yüksekte bulunuyor!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    if (!rMember.roles.cache.has(aRole.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Bu rolü bu kullanıcıda göremiyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
 
  await (rMember.roles.remove(aRole.id));
 message.react('✅')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "rolal",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolal <mesaj>"
};