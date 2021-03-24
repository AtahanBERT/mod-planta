const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")


exports.run = function(client, message, args) {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.logger;

if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
  
if(isNaN(args[0])) {
  var errembed = new Discord.MessageEmbed().setDescription((`${basarisiz} Lütfen 1-100 arasında sayı belirtiniz!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
return message.channel.send(errembed).then(x => x.delete({timeout: 5000}));
}
  
if (args[0] < 1) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} **1** adetten az mesaj silemem!`)).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if (args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} **100** adetten fazla mesaj silemem!`)).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply((`${basarisiz} Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_`).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
})
message.channel.send(new Discord.MessageEmbed().setDescription((`${basarili} **${args[0]}** adet mesaj başarıyla silindi!`)).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'sil',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: '.sil <miktar>'
};