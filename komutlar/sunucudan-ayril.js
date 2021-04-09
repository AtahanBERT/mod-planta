const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = async (bot, message, args, client) => {
   const id = require('quick.db')
   if(message.author.id !== ayarlar.sahip) return message.channel.send(`${basarisiz} Hey Sen Benim Sahibim Değilsin!`);
 
  let guildid = args[0]
  if(!guildid) return message.channel.send(`${basarisiz} Ayrılınacak sunucunun id sini girmelisin!`)
bot.guilds.cache.get(guildid).leave();
const embed = new Discord.MessageEmbed()
 
.addField(`${basari} İşlem Başarılı ','Başarıyla sunucudan Ayrıldım`)
.addField(`Ayrıldığım Sunucunun İD si:`,`ID: ${guildid}`)
.setFooter('Planta Team a Aittir.')
message.channel.send(embed)
 
}
exports.conf = {
  enabled:true,
  guildOnly:false,
  aliases : ['sunucu-ayril'],
  permLevel:0
};
exports.help = {
  name: 'sunucudan-ayrıl',
  description:'Belirtilen İD deki Sunucudan Ayrılır',
  usage:'sunucudan-ayrıl '
};