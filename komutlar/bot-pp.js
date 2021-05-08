const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {

    if(message.author.id !== ayarlar.sahip) 
    return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    const ayarlanan = args.join(` `);
    client.user.setAvatar(ayarlanan);
  return message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarıyla avatarımı değiştirdim.`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp());
  message.channel.send(`Başarıyla ${ayarlanan} Resim Konuldu`)
      
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-pp"],
  permLevel: 0
};

exports.help = {
  name: 'avatar-ayarla',
  description: 'Botun avatarını ayarlar. Sen yapamazsın :D',
  usage: 'avatar-ayarla <URL>'
};
