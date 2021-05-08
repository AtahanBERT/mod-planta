const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (message.author.id != ayarlar.sahip)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
{

let isim = args.slice(0).join(" ")
if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, İsmimi belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(isim.length > 32) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

client.user.setUsername(isim) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarılı bir şekilde ismim \`${isim}\` olarak değiştirildi.`).setFooter(`NOT: 3 Kezden Fazla Kullanınca Değişmeyebilir Biraz Sonra Tekrar Deneyin Olucaktır.`, message.guild.iconURL({dynamic: true})).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp())
.catch(error => {
message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, İsmini çok hızlı değiştiriyosun!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}))
})}};
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
}//! ま Atahan#1956