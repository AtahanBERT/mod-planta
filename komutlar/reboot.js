const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "429357746002067493") return message.channel.send(`${basarisiz} Yapımcım Değilsin!`)
    
    message.channel.send(`${basari} Bot yeniden başlatılıyor...`).then(msg => {
    console.log(`${basari} BOT: Yeniden Başlatılıyor.....`);
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