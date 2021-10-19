const { Discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {

  
  if(message.author.id !== ayarlar.sahip) return
  
  if(!args[0]) return message.channel.send('Bakım modunu açmak/kapatmak için m!bakım aç/kapat')
  
  let basari = ayarlar.basariliemoji
  let basarisiz = ayarlar.basarisizemoji
  
  if(args[0] === 'aç') {
    message.channel.send(`${basari} Bakım modu açıldı.`)
    db.set(`bakim`)
  }
  
  if(args[0] === 'kapat'){
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