const discord = require('discord.js')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  
  let basarili = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
  let kanal = ayarlar.botkomut;
  
  if(message.channel.id !== kanal) return message.react(basarisiz);

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
   
  let guild = message.guild;
    let [link, ad] = args.slice(0).join(" ").split(" ");
    if (!link) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Bir link belirtmelisin!`));
    if (!ad) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Bir isim belirtmelisin!`));
  
    guild.emojis.create(link, ad)
      .then(emoji => message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${basarili} Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)))
      .catch(console.error);
    return;
  };
    
  

exports.conf = {
  enabled: true,
  guildonly: true,
  aliases: ['emoji'],
  permlevel: 0
}
exports.help = {
  name: 'ee',
  description: '',
  usage: ''
}