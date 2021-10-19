const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== ayarlar.sahip) return message.channel.send(`${basarisiz} Yapımcım Değilsin!`)
    
    message.channel.send(`${basari} ${message.author}, Bot yeniden başlatılıyor...`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    message.edit(`${basari} ${message.author}, Bot başarıyla yeniden başlatıldı.`)
    process.exit(0);
  })
    
          
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot","yeniden başlat","restart"],
permLevel: 4
};

module.exports.help = {
  name: 'reboot',
  description: 'Botunuzu yeniden başlatır....',
  usage: 'reboot'
};