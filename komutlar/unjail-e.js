const Discord = require('discord.js');
exports.run = async (client, message, args) => {
 
  let hata = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&770868327060471819> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("770868327060471819")) return message.channel.send(hata) 
let kullanıcı = message.mentions.users.first()
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('Bir üye etiketlemen gerekiyor!'));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first()
let member = message.guild.member(kullanıcı)
member.roles.add('770473551127248906')
member.roles.add('770473550431518772')
member.roles.remove('770901723929378836')

   

const embed1 = new Discord.MessageEmbed()
.setAuthor('Bir Üye Cezalıya Çıkarıldı')
.addField(`Jailden Çıkarılan Kullanıcı`,` ${kullanıcı}`)
.addField(`Jailden Çıkaran Yetkili`,` <@${message.author.id}>`)
.addField(`Jailden Çıkarılınca Verilen Roller`, `<@&770473551127248906>, <@&770473550431518772>`)
.setColor("#ffecbc")
.setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setFooter(`Geliştirici qmi <3`, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setTimestamp()
client.channels.cache.get('775358713723748372').send(embed1)
  
  let embed = new Discord.MessageEmbed() 
.setDescription(`${kullanıcı} Adlı Kişisinin <@&770901723929378836> Rolü Alınarak ,<@&770473551127248906> ve <@&770473550431518772> Rolleri Verildi! `) 
.setColor("#ffecbc")
return message.channel.send(embed);
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail-e","uerkek"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'ue',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}