const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = async (bot, message, args, client) => {
   const id = require('quick.db')
   if(message.author.id !== ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 
  let guildid = args[0]
  if(!guildid) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Ayrılınacak Sunucunun İD Sini Girmelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
bot.guilds.cache.get(guildid).leave();
const embed = new Discord.MessageEmbed()
 
.addField(`İşlem Başarılı ','Başarıyla sunucudan Ayrıldım`)
.addField(`Ayrıldığım Sunucunun İD si:`,`ID: ${guildid}`)
.setFooter('Extacy Community e Aittir.')
message.channel.send(embed)
 
}
exports.conf = {
  enabled:true,
  guildOnly:false,
  aliases : ['sunucu-ayril','çık','çik'],
  permLevel:0
};
exports.help = {
  name: 'sunucudan-ayrıl',
  description:'Belirtilen İD deki Sunucudan Ayrılır',
  usage:'sunucudan-ayrıl '
};