const { Discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {

  
  if(message.author.id !== ayarlar.sahip) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  let data = db.fetch(`bakim`)
  let basari = ayarlar.basariliemoji
  let basarisiz = ayarlar.basarisizemoji
    
  if(args[0] === 'aç'){
    if (data) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bakım modu zaten açık.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, Bakım modu başarıyla açıldı.`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    db.set(`bakim`)
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