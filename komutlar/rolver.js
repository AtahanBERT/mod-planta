const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;



exports.run = async (bot, message, args) => {
 
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
  
     let basarili = ayarlar.basariliemoji;
     let basarisiz = ayarlar.basarisizemoji;
     let yetkili = ayarlar.logger;

  
 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);

  
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!rMember) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol vermem için bir kişiyi etiketlemelisin!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let role = message.mentions.roles.first()

    if (!role) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol verebilmem için rolü belirtmelisiniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let aRole = message.mentions.roles.first()
    if (!aRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Etiketlediğiniz rolü sunucuda bulamıyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

    if (rMember.roles.cache.has(aRole.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Bu rolü bu kullanıcıda görüyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    await (rMember.roles.add(aRole.id))
 message.react('✅')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver', 'rolekle'],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "Kişilere Rol Yetkisi Verir",
  usage: " <mesaj>"
};