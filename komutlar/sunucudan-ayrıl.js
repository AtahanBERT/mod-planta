const discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => { 
  
if(message.author.id != ayarlar.sahip) return

message.channel.send("görüşürüz ;(")
message.guild.leave();

};
exports.conf = {
aliases: ["çık"]
};
exports.help = {
name: "ayrıl"
};