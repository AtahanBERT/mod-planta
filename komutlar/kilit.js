const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

module.exports.run = async(client, message, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return 
  let basari = ayarlar.basariliemoji
  let basarisiz = ayarlar.basarisizemoji
  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  let permObjesi = {};
  let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
  everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
  });
  everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
  });
  if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
   
    let kilitle = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`${basari} Kanal kilitlendi!`)
    .setColor('#7289DA')
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send({embed:kilitle})
  } else {
    let kilit = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`${basari} Kanal kilidi açıldı!`)
    .setColor('#7289DA')
    permObjesi["SEND_MESSAGES"] = null;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send({embed:kilit});
  };
};
exports.conf = {
 enabled: true, 
  guildOnly: true, 
  aliases: ["kilit"], 
  permLevel: 0 
};

exports.help = {
  name: "kilit" 
};