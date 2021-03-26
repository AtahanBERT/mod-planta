const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const basarisiz = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {
if (!message.member.roles.cache.get(ayarlar.emojiyetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${basarisiz} Bu komutu kullanabilmek için ``Emojileri Yönet`` yetkisine sahip olmalısın.`);
if(!args[0]) return message.channel.send('Bir link ve ad yazmalısın. `m!eegif https://cdn.discordapp.com/emojis/601379275769118731.gif plantateam`');
if(!args[0].endsWith('.gif')) return message.channel.send(`${basarisiz} Doğru bir link yazmalısın.`);
if(!args[1]) return message.channel.send('Bir emoji adı yazmalısın. `m!eegif https://cdn.discordapp.com/emojis/601379275769118731.gif plantaTeam`');
if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(args[1])) return message.channel.send((`${basarisiz} **Emoji adını yazarken Türkçe karakter kullanmamalısın!**`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
message.guild.emojis.create(args[0], args.slice(1).join(' ')).then(s => {
message.channel.send(`${basari} ${s.name} adında emoji oluşturuldu. (${s})`);
});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eegif'],
  permLevel: 0
};
 
exports.help = {
  name: 'emojiekle-gif'
};