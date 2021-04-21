const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")


exports.run = async (client, message, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:plantacarp:815252488168931368> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
 
  let yetkili = ayarlar.jailyetkili;
  let jaillogkanal = message.guild.channels.cache.find(c => c.id === ayarlar.jaillog)//Jail Log
  let kızrol1 = ayarlar.kızrol1;
  let kızrol2 = ayarlar.kızrol2;
  let cezalı = ayarlar.cezalı;
  let erkek3 = ayarlar.kızrol3;
  let basarili = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;

 
 
   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz); 
  
let kullanıcı = message.mentions.users.first()|| message.guild.members.cache.get(args[0])
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`${basarisiz} Bir üye etiketlemen gerekiyor!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);
member.roles.add(kızrol1);
member.roles.add(kızrol2);
member.roles.remove(cezalı);

member.roles.add(erkek3);

   

const embed1 = new Discord.MessageEmbed().setColor('GREEN')
.setDescription((`Başarılı bir şekilde ${kullanıcı} adlı \`kız\` kullanıcı, ${message.author.tag} tarafından jailden çıkarıldı!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
jaillogkanal.send(embed1)
message.react('✅').catch;

  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail-k","ukız"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'uk',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebep'
}