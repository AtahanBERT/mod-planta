const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
 
    let yetkili = ayarlar.kayıtyetkili;
    let unregister = ayarlar.kayıtsız;
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(kullanıcı);
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let tag = ayarlar.tag


   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
   if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} Kayıtsıza atabilmek için bir kullanıcı belirtmelisin!`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
   if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
   if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} Sahibimin üzerinde komut kullanamazsın!`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

member.roles.cache.forEach(r => {
member.roles.add(unregister);
member.setNickname(`${tag}| -İsim Yaş-`);
member.roles.remove(r.id);
});
  

return message.react('✅')
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unregister","ur"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'kayıtsız',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}