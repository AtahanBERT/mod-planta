const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

module.exports.run = async(client, message, args) => {
  if(message.author.id !== ayarlar.sahip) return 

const tag = args.slice(0).join(" ")
if(!tag) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir Tag Belirt!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x800d0d').setTimestamp())
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(tag)).size

message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, Belirtilen Taga Sahip `+sonuc+` Kişi Banlandı!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp())
message.react('✅')
}
module.exports.conf = {
aliases: ["bul-ban"]
}

module.exports.help = {
name: "tag-ban"
};