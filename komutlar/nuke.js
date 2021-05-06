const Discord = require('discord.js');
const database = require('quick.db');
const { Client, MessageEmbed } = require('discord.js');


exports.off = async (client, message, args) => {
  
let basari = "";
let basarisiz = "";
let channel = message.mentions.channels.first() || message.channel;
let position = channel.position;
channel.delete();
await channel.clone({ reason: "nuke" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  }).then(s => {
s.setPosition(position);
s.send(new MessageEmbed().setDescription(`${basari} ${message.author}, `).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());
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