const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = (bot, message, args) =>
{
  let Discord = require('discord.js');
  let basari = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
    var userlist = message.guild.fetchBans();
   userlist.then(collection =>
   {
     if(collection.first() == null)
     {
       let embed = new Discord.MessageEmbed()
       .setTitle(`${basarisiz} Banlanan Kullanıcı bulunamadı`)
       .setColor("RED");
       message.channel.send(embed);
     }
     else
     {
       let embed = new Discord.MessageEmbed()
       .setTitle("Ban Listesi: Sunucudan Banlananlar.")
       .setColor("RED");
       for(userlist of collection)
       {
           var user = userlist[1];
           embed.addField(` **${user.tag}**`, `_________ _____________`);
       }
       message.channel.send(embed);
     }
   });
 }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banlılar","banliste","ban liste"],
  permLevel: 0
};
module.exports.help = {
  name: 'banlist',
  description: 'Sunucundan Banlanan üyeleri gösterir.',
  usage: 'banlananlar'
};