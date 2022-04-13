const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const basarisiz = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {
  
  
  
if (!message.member.roles.cache.get(ayarlar.emojiyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir link ve ad yazmalısın. Örnek: **.eepng https://cdn.discordapp.com/emojis/601379275769118731.png plantateam**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
//if(!args[0].endsWith('.png')) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Doğru bir link girmelisin!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!args[1]) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir emoji adı yazmalısın. Örnek: **.eepng https://cdn.discordapp.com/emojis/601379275769118731.png plantateam**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ', ':'].includes(args[1])) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} **Emoji adını yazarken Türkçe karakter kullanmamalısın!**`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
message.guild.emojis.create(args[0], args.slice(1).join(' ')).then(s => {
message.channel.send(new MessageEmbed().setDescription(`${basari} \`${s.name}\` adında emoji oluşturuldu. (${s})`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp())
message.react('✅')
});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eepng'],
  permLevel: 0
};
 
exports.help = {
  name: 'emojiekle-png'
};