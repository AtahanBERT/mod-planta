const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
if (!message.member.voice.channel) 
return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} ${message.author}, Ses kanalında olman lazım!`)).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};

let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} ${message.author}, Lütfen Bir Kullanıcı Belirt.`)).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} ${message.author}, Etiketlenen Kullanıcı Ses Kanalında Değil.`)).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanıcı}, ${message.author} \`${message.member.voice.channel.name}\` Odasına Çekmek İstiyor. Kabul ediyormusun ?`)
  
let mesaj = await message.channel.send(log)
await mesaj.react("✅")
await mesaj.react("❌")
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '✅') {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription((`${basari} ${message.author}, ${kullanıcı} Odaya Çekilme Teklifini Onayladı`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let striga = new Discord.MessageEmbed()
.setDescription((`${basarisiz} ${message.author}, ${kullanıcı} Odaya Çekilme Teklifini Reddetti`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
message.channel.send(striga)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gel"],
  permLevel: 0,
}

exports.help = {
  name: 'gel'
  
}