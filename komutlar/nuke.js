const database = require('quick.db');
const { Discord, Client, MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
if (message.member.hasPermission("ADMINISTRATOR")); return

let channel = message.mentions.channels.first() || message.channel;
let position = channel.position;
channel.delete();
await channel.clone({ reason: "nuke" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  }).then(s => {
s.setPosition(position);
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