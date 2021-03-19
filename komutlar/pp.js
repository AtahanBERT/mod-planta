const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
const db = require('quick.db')


exports.run = function(client, message, args) {
         
  let basarisiz = ayarlar.basarisizemoji;
  
const embed = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
let user;
if (message.mentions.users.first())  {user = message.mentions.users.first();}
  
else {user = message.author;}

return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setImage(user.avatarURL({ dynamic: true, format: 'png', size: 1024 }))).then(x => x.delete({timeout: 15000}))
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["pp"],
permLevel: 0
  
};
  
exports.help = {
name: 'avatar'
};