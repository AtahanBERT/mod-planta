const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
let yetkili = ayarlar.mod;

exports.run = async(client, message, args) => {
  
  
if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if (!kullanıcı) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı Etiketle veya İD gir.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
let extacy = args.slice(1).join(" ")
if(!extacy) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir mesaj belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.delete();
kullanıcı.send(new MessageEmbed().setDescription(extacy).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#3498db').setFooter(`Atahan`, message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })).setTimestamp())
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dm-at','dm'],
  permLevel: 0,
};

exports.help = {
  name: 'dmat'
};