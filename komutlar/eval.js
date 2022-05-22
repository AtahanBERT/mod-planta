const { Discord, MessageEmbed } = require('discord.js');
const util = require("util");;
const moment = require('moment');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
 
exports.run = (client, message, args) => {
if (message.author.id !== ayarlar.sahip)
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    try {
    let komut = eval(args.join(" "))
    if(!komut) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir mesaj belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let Çıktılar = ["string","boolean","number","float"]
    if (Çıktılar.includes(typeof komut)) {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + komut + "\n```")
    .setColor('GREEN')
    message.channel.send(Embed)
    message.react('✅')
    } else {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + require('util').inspect(komut) + "\n```")
    .setColor('GREEN')
    message.channel.send(Embed)
    message.react('✅')
}
    } catch(err) {
     let embed = new MessageEmbed()
    .setDescription("**Hata**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + err + "\n```")
    .setColor('RED')
    message.channel.send(embed)
    message.react('❌')

    }

};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
 
exports.help = {
  name: 'eval',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};