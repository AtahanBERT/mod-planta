const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (!message.author.id !== ayarlar.sahip)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} Başarılı bir şekilde ${kullanici} adlı kişinin kullanıcı adı \`${isim} ${yaş}\` olarak değiştirildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}))
 Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000})); 

let isim = args.slice(1).join(" ")
if(isim.length > 32) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

client.user.setUsername(isim)
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari}  Başarılı bir şekilde ismim \`${isim}\` olarak değiştirildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}))
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot-i'],
    permLevel: 0
}

exports.help = {
    name: 'bot-isim',
    description: 'Botun İsmini Değişir',
    usage: 'bot-isim (bot ismi)'
};