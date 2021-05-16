const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
       let basarisiz = ayarlar.basarisizemoji;
       let basari = ayarlar.basariliemoji;
  
    let kullanıcıkanal = message.author.voice.channel;
  
if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sahibimin üzerinde komut kullanamazsın!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanıcıkanal) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlediğin Kullanıcı Sesli Kanalda Değil!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if(kullanıcıkanal) {
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, **${kullanıcıkanal}** `).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp())
message.react('✅')
};
 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanalim','nerdeyim'],
  permLevel: 0
};

exports.help = {
  name: 'kanalım',
  açıklama: ''
};