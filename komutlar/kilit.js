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
  let erkek = message.guild.roles.cache.get(ayarlar.erkekrol1);
  let kız = message.guild.roles.cache.get(ayarlar.kızrol1);
  let ever = kız + erkek + everyone
  
  if(message.channel.permissionsFor(erkek, kız, everyone).has('SEND_MESSAGES')) {
   
    let kilitle = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`${basari} Kanal kilitlendi!`)
    .setColor('#7289DA')
    ever["SEND_MESSAGES"] = false;
    message.channel.send(kilitle)
  } else {
    let kilit = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription(`${basari} Kanal kilidi açıldı!`)
    .setColor('#7289DA')
    ever["SEND_MESSAGES"] = true;
    message.channel.send(kilit);
  };
};
exports.conf = {
 enabled: true, 
  guildOnly: true, 
  aliases: ["kilit","lock","kilitle"], 
  permLevel: 0 
};

exports.help = {
  name: "kilit" 
};