const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
 
if (!message.member.roles.cache.get(ayarlar.logger) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

 let uyarı1 = ayarlar.uyarı1;
 let uyarı2 = ayarlar.uyarı2;
 let uyarı3 = ayarlar.uyarı3;
 let sunucu = message.guild;
 let uyarilcak = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
 let sebep = args.slice(1).join(" ");

if(!uyarilcak) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

  

 message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, ${uyarilcak} Adlı kişiyi başarıyla uyardım, özel mesajlarında uyarısı gözükücektir.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());
 return uyarilcak.send(new Discord.MessageEmbed().setDescription(`${sunucu}, Sunucusunda \`${sebep}\` Sebebiyle Uyarıldın!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('BLACK').setTimestamp())
 message.react('✅');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarı","uyarıver","uyari"],
  permlevel: 0
};

exports.help = {
  name: "uyar",
  description: "Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.",
  usage: "uyarı"
};