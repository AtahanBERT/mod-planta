const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const basarisiz = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {
if (!message.member.roles.cache.get(ayarlar.emojiyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(`${basarisiz} Bu komutu kullanabilmek için ``Emojileri Yönet`` yetkisine sahip olmalısın.`);
if(!args[0]) return message.channel.send('Bir link ve ad yazmalısın. `m!eepng https://cdn.discordapp.com/emojis/601379275769118731.png plantateam`');
if(!args[0].endsWith('.png')) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Doğru bir link girmelisin!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!args[1]) return message.channel.send('Bir emoji adı yazmalısın. `m!eepng https://cdn.discordapp.com/emojis/601379275769118731.png plantaTeam`');
if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(args[1])) return message.channel.send(`${basarisiz} **Emoji adını yazarken Türkçe karakter kullanmamalısın!**`);
message.guild.emojis.create(args[0], args.slice(1).join(' ')).then(s => {
message.channel.send(`${basari} ${s.name} adında emoji oluşturuldu. (${s})`);
});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eepng'],
  permLevel: 0
};
 
exports.help = {
  name: 'emojiekle-png'
};