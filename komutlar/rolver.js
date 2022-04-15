const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
const moment = require("moment")

var prefix = ayarlar.prefix;



exports.run = async (client, message, args) => {
  
     let basarili = ayarlar.basariliemoji;
     let basarisiz = ayarlar.basarisizemoji;
     let yetkili = ayarlar.logger;
     

  
 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

  
    let rMember = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
    if (!rMember) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol vermem için bir kişiyi etiketlemelisin!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name == args.slice(1).join(" "));

    if(message.member.roles.highest.position <= rMember.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (!role) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Rol verebilmem için rolü belirtmelisiniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let aRole = message.mentions.roles.first()
    if (!aRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Etiketlediğiniz rolü sunucuda bulamıyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.comparePositionTo(role) < 1) 
  return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Bu rol senden daha yüksekte bulunuyor!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (rMember.roles.cache.has(aRole.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Bu rolü bu kullanıcıda görüyorum!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    await (rMember.roles.add(aRole.id))
moment.locale("tr")
let embed = new Discord.MessageEmbed()
.setColor('GRAY')
.setAuthor(`Samar`, message.guild.iconURL({dynamic: true}))
.setDescription(`${rMember}, adlı üyeye ${aRole} rolü ${message.author} tarafından \`${moment(Date.now()).add(3,"hours").format("DD MMMM YYYY HH:mm")}\` tarihinde verildi.`)
.setFooter(`Atahan`) 
  
client.channels.cache.get("963746646993285191").send(embed)

message.react('✅')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};