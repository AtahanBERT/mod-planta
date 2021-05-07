const database = require('quick.db');
const { Discord, Client, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
let yetkili = ayarlar.forever;//yetkili rol id

exports.run = async (client, message, args) => {

if (!message.member.roles.cache.get(yetkili) & message.author.id != ayarlar.sahip)
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
{

let channel = message.mentions.channels.first() || message.channel;
let position = channel.position;
channel.delete();
await channel.clone({ reason: "nuke" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  }).then(s => {
s.setPosition(position);
});
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'nuke',
  description: "Lavinia31"
};