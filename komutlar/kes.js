const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
 if (!message.member.roles.cache.get(ayarlar.muteyetkili) & !message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return;
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.guild.member(member.id).voice.setChannel(null)
message.react('✅')
   message.channel.send(new MessageEmbed().setDescription(`${basari} ${member} Kullancısının ${message.author} Tarafından Bağlantısı Kesildi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#7289D').setTimestamp()).then(x => x.delete({timeout: 10000}));
}
exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["ses-kes"]
}

exports.help = {
name: "kes" 
}
