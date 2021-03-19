const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {

if (!message.member.roles.cache.get(ayarlar.kayıtyetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${basarisiz} Bu Komutu Kullanmak İçin **Yetkili** Olmalısın!`);

let tag = ayarlar.tag;
let isim = args.slice(1).join(' ');
let kullanici = message.mentions.users.first();
  
if(!kullanici) return message.reply(`${basarisiz} Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiştir @${client.user.username}#${client.user.discriminator} <yeni isim>\``)
  
if(!isim) return message.reply(`${basarisiz} Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiştir @${client.user.username}#${client.user.discriminator} <yeni isim>\``)
if(isim.length > 32) return message.reply(`Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`)
  
message.guild.members.cache.get(kullanici.id).setNickname(`${tag} ${isim}`)
message.channel.send(`${basari} Başarılı bir şekilde \`${kullanici.username}\` adlı kişinin kullanıcı adı \`${tag} ${isim}\` olarak değiştirildi.`)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimdegistir','ideğiş','idegis','isim'],
    permLevel: 0
}

exports.help = {
    name: 'isimdeğiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı <kullanıcı adı>'
};