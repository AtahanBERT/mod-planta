const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

let yetkili = db.fetch(`kayityetkili_${message.guild.id}`)
if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000})); 

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
if(!kullanici) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz}  ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
message.guild.members.cache.get(kullanici.id).setNickname(null)
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} Başarılı bir şekilde ${kullanici} adlı kişinin kullanıcı adı sıfırlandı.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}))
message.react('✅');  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isim-reset','i-sıfırla','i-sifirla','isim-sifirla','i-reset'],
    permLevel: 0
}

exports.help = {
    name: 'isim-sıfırla',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı <kullanıcı adı>'
};