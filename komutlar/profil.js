const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix
exports.run = function (client, message, args) {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}
  
  let basarisiz = ayarlar.basarisizemoji;
  let kanal = ayarlar.botkomut;
  let yetkili = ayarlar.logger;

  if(message.channel.id !== kanal) return message.react(basarisiz)

  
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);

   var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    }
    var duration = moment.duration(client.uptime).format(" D [gün] H [saat] m [dakika] s [saniye]")
  
  
  var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi ") : (Durum == "offline" ? ("Çevrimdışı ") : (Durum == "idle" ? ("Boşta ") : (Durum == "dnd" ? ("Rahatsız Etmeyin ") : ("Bilinmiyor/bulunamadı.")))))
  
  var üye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (üye) {
    const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.addField('Profil', `
**Ad:** ${üye.username}\n
**ID: ** ${üye.id}\n
**Oynadığı Oyun: ** ${üye.presence.game ? üye.presence.game.name : 'Şu an oyun oynamıyor'}\n
**Durum** ${durm}\n
**Oluşturulduğu Tarih: ** ${(`${moment(üye.createdAt).format('DD')} ${aylar[moment(üye.createdAt).format('MM')]} ${moment(üye.createdAt).format('YYYY HH:mm:ss')}`)}\n
**Bot mu?** ${üye.bot ? 'Evet' : 'Hayır'}`)
.setThumbnail(üye.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    message.channel.send(embed)
  } else {
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username)
.setColor('GREEN')
.addField('Profil', `
**Ad:** ${message.author.username + '#' + message.author.discriminator}\n
**ID: ** ${message.author.id}\n
**Oynadığı Oyun: ** ${message.author.presence.game ? message.author.presence.game.name : 'Şu an oyun oynamıyor'}\n
**Durum** ${durm}\n
**Oluşturulduğu Tarih: ** ${(`${moment(message.author.createdAt).format('DD')} ${aylar[moment(message.author.createdAt).format('MM')]} ${moment(message.author.createdAt).format('YYYY HH:mm:ss')}`)}\n
**Bot mu?** ${message.author.bot ? 'Evet' : 'Hayır'}`)
.setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(embed)
  
  }
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'profil',
  description: 'Profil.',
  usage: 'profil'
};