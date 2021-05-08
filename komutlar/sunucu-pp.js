const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (message.author.id !== ayarlar.sahip & message.author.id !== ayarlar.baran & message.author.id !== ayarlar.eray)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
{

let Atahan = args.join(` `)
if(!Atahan) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Koyulcak resmin URL sini belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.setIcon(Atahan)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarılı bir şekilde sunucu resmini değiştirdim.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp())
};
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucu-pp','server-av','sunucu-av','server-pp','server-resim'],
    permLevel: 0,
}

exports.help = {
    name: 'sunucu-resim',
    description: 'Sunucunun Resmini Değişir',
    usage: 'sunucu-resim <URL>'
}//! ま Atahan#1956