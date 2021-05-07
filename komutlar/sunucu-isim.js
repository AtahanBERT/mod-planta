const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (message.author.id != ayarlar.sahip)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
{

let isim = args.slice(0).join(" ")
if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Koyulcak ismi belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.setName(isim)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sunucu ismi değişirken hata oluştu.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarılı bir şekilde sunucu ismi \`${isim}\` olarak değiştirildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp())
};
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucu-i','server-i'],
    permLevel: 0
}

exports.help = {
    name: 'sunucu-isim',
    description: 'Sunucunun İsmini Değişir',
    usage: 'sunucu-isim (sunucu ismi)'
}//! ま Atahan.sńd#1956