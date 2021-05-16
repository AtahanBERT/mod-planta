const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
 
if (!message.member.roles.cache.get(ayarlar.logger) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

 let kullanıcı = message.mentions.users.first()
 let uyarisayisi = db.fetch(`uyari.${message.guild.id}_${kullanıcı.id}`);
 let sunucu = message.guild;
 let uyarilcak = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
 
if(kullanıcı.bot)
  return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Botların uyarısına bakamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, ${uyarilcak} Adlı kullanıcının ${uyarisayisi} uyarısı var.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarı-say","uyarısay","uyari-say"],
  permlevel: 0
};

exports.help = {
  name: "uyarı-sayı",
  description: "Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.",
  usage: "uyarı"
};