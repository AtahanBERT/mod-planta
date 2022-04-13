const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const basarisiz = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {

if (!message.member.roles.cache.get("948426843306991637"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

const moment = require('moment')
moment.locale("tr")
let embed = new MessageEmbed()
.setColor('GRAY')
.setAuthor(`Samar`, message.guild.iconURL({dynamic: true}))
.setDescription(`${kullanici}, adlı üye ${message.author} tarafından \`${moment(Date.now()).add(3,"hours").format("DD MMMM YYYY HH:mm")}\` tarihinde <@&948243581838192730> rolü verildi.`)
.setFooter(`Atahan`)

kullanici.roles.add("948243581838192730") 
message.react('✅')
client.channels.cache.get("963747543601283102").send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'nsfw'
};