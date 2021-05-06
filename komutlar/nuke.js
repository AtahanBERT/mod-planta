const Discord = require('discord.js');
const database = require('quick.db');
const { Client, MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
.setTitle('BAŞARILI!')
.setColor(0xff0000)
.setDescription('KANAL BAŞARI İLE NUKELENDİ! & L4v1n14#0707');

exports.run = async (client, message, args) => {// can#0002
  
let channel = message.mentions.channels.first() || message.channel;
 await channel.clone({ reason: "Kanal Koruma Sistemi" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  });

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'nuke',
  description: "Lavinia31"
};