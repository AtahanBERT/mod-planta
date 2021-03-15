const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const basarisiz = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${basarisiz} Bu komutu kullanabilmek için ``Emojileri Yönet`` yetkisine sahip olmalısın.`);
if(!args[0]) return message.channel.send('Bir link ve ad yazmalısın. `m!emojiekle https://cdn.discordapp.com/emojis/601379275769118731.gif plantateam`');
if(!args[0].endsWith('.gif')) return message.channel.send('Doğru bir link yazmalısın.');
if(!args[1]) return message.channel.send('Bir emoji adı yazmalısın. `m!emojiekle https://cdn.discordapp.com/emojis/601379275769118731.gif plantaTeam`');
if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(args[1])) return message.channel.send(`${basarisiz} **Emoji adını yazarken Türkçe karakter kullanmamalısın!**`);
message.guild.emojis.create(args[0], args.slice(1).join(' ')).then(s => {
message.channel.send(`${basari} ${s.name} adında emoji oluşturuldu. (${s})`);
});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojiekle'],
  permLevel: 0
};
 
exports.help = {
  name: 'emoji-ekle'
};