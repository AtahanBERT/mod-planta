const Discord = require('discord.js');
///spammer by planta
 
exports.run = (client, message, args) => {
  if (message.author.id == "429357746002067493") {
      let sayi = args[0];
      let mesaj = args.slice(1).join(' ');
   
if (mesaj.length < 1) return message.reply('Spamlamam için herhangi bir şey yazmalısın.');
   message.delete();
for (var i = 0; i < sayi; i++)
{
  message.channel.send(mesaj);
}

}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'spam',
  description: 'spammer',
  usage: 'spam [yazdırmak istediğiniz şey]'
};