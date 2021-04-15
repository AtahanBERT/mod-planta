const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (!message.member.roles.cache.get(ayarlar.kayıtyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000})); 

let tag = ayarlar.tag;
let isim = args[1]
let yaş = args[2]
let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
if(!kullanici) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanici) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Lütfen yaş belirtiniz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(isim.length > 32) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
message.guild.members.cache.get(kullanici.id).setNickname(`${tag} ${isim} ${yaş}`)
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} Başarılı bir şekilde ${kullanici} adlı kişinin kullanıcı adı \`${tag} ${isim} ${yaş}\` olarak değiştirildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}))
message.react('✅');
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimdegistir','ideğiş','idegis','isim','i'],
    permLevel: 0
}

exports.help = {
    name: 'isimdeğiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı <kullanıcı adı>'
};