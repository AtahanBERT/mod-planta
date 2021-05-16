const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
       let basarisiz = ayarlar.basarisizemoji;
       let basari = ayarlar.basariliemoji;
       let yetkili = ayarlar.logger;

  
     let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  let kullanıcıkanal = kullanıcı.voice.channel;
  
if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sahibimin üzerinde komut kullanamazsın!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanıcıkanal) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlediğin Kullanıcı Sesli Kanalda Değil!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if(kullanıcıkanal) {
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, ${kullanıcı} adlı kullanıcı **${kullanıcıkanal}** kanalında bulunmakta.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp())
message.channel.send(`${kullanıcıkanal}`)
message.react('✅')
};
 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nerede'],
  permLevel: 0
};

exports.help = {
  name: 'nerde',
  açıklama: ''
};