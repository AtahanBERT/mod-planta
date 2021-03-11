const Discord = require("discord.js");const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:plantacarp:815252488168931368> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!");
}
const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.');

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete,{timeout: 5000});

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setAuthor(kullanıcı.displayName, kullanıcı.user.avatarURL({dynamic: true, size: 2048}))
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
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Onayladı`)
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let striga = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Reddetti`)
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