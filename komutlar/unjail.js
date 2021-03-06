const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require('moment')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if (!message.member.roles.cache.get(ayarlar.jailyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const cezalırol = ayarlar.cezalı//Jail Rol 
const jaillog = message.guild.channels.cache.find(c => c.id === ayarlar.jaillog)//Jail Log

//-------------------------------------------------------------------------------\\

let basari = ayarlar.basariliemoji
let basarisiz = ayarlar.basarisizemoji
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.slice(1).join(" ")
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanici.bannable)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcıya komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Kendine komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir bot üzerinde bu komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sunucu sahibimin üzerinde komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");  
  
datab.delete(`cezali_${message.guild.id + kullanici.id}`, 'cezali')
datab.delete(`süreJail_${message.mentions.users.first().id + message.guild.id}`, zaman1)

let tumaylar = {
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
"12": "Aralık", 
}
let aylar = tumaylar;
  
moment.locale("tr");
jaillog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Cezası Bitirildi !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${kullanici.user} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
message.react('✅')

let roller = await datab.fetch(`jail_roller_${kullanici.id}`)
if(!roller) {
kullanici.roles.set(["943997574258511953"])
}
if(roller) {
kullanici.roles.set(roller)
datab.delete(`jail_roller_${kullanici.id}`)
datab.delete(`jail_${kullanici.id}`)
}

  
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unjail','ceza-kaldır','unj'],
    permLevel: 0,
}

exports.help = {
      name: "unjail"  
  
}