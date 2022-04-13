const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require("../ayarlar.json");



exports.run = function(client, message, args) {
    
    let basari = ayarlar.basariliemoji
    let basarisiz = ayarlar.basarisizemoji
    let şikayetlog = ayarlar.sikayetlog
    let prefix = ayarlar.prefix
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`> ${basarisiz} **__Hatalı Kullanım...__**\n\n > **__Doğru Kullanım__** \n **\`${prefix}şikayet <şikayetiniz>\`**`));
  
    let yönlendirme = new MessageEöbe
  
  if(message.channel.id !== şikayetlog) return 

const ace = new Discord.MessageEmbed()
.setDescription(`${basari} <@${message.author.id}>\n\n Şikayetiniz / Talebiniz Bildirildi! En Kısa Sürede Geri Dönüş Yapılıcakatır.\n\n Anlayışınız İçin Teşekkürler`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(ace)

const acee = new Discord.MessageEmbed()
.setDescription(`<@${message.author.id}> adlı kullanıcının **__Şikayeti__**:`)
.addField(`**Kulanıcı Bilgileri**`, `> **__Kullanıcı ID:__** **\`${message.author.id}\`**\n> **__Kullanıcı Adı:__** **\`${message.author.username}\`**\n> **__Kullanıcı Tagı:__** **\`${message.author.discriminator}\`**`)
.addField("Kullanıcı Şikayeti", type)
.setThumbnail(message.author.avatarURL)
 client.channels.cache.get(şikayetlog).send(acee);
 client.channels.cache.get(şikayetlog).send('@everyone')
 message.react('✅')
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["şikayet","report"],
  permLevel: 0 
};

exports.help = {
  name: 'şikayet',
  description: 'Şikayet de bulunursunuz..',
  usage: 'şikayet <şikayet>'
}; 