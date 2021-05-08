const { Discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {

  
  if(message.author.id != ayarlar.sahip) return
  
  if(!args[0]) return message.channel.send('Bakım modunu açmak için m!bakım aç')
  
  let basari = ayarlar.basariliemoji
  let basarisiz = ayarlar.basarisizemoji
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`, 'açik')) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Bakım modu zaten açık`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    message.channel.send(new MessageEmbed().setDescription(`${basari} Bakım modu açıldı.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    db.set(`bakim`)
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Bakım modu zaten kapalı.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    message.channel.send(`${basari} Bakım modu kapatıldı.`)
    db.delete(`bakim`)
  }
  
}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bakim"],
  permLevel: 0
}

exports.help = {
  name: 'bakım'
}