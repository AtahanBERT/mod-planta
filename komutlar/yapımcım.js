const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    var embed = new Discord.MessageEmbed()
    .setTitle("Yapımcım Adam Gibi Adam")
    .setDescription("<@429357746002067493> | ! ま Atahan ᛜ#0001")
    .setImage('https://images-ext-2.discordapp.net/external/sKcMKrk3CMWx0rccRtVo8uoGOIX06juRHqBT3O4QCJo/https/media1.tenor.com/images/c56e262cc5781c99ab1ca33a5d0c6bfe/tenor.gif')
    .setColor("#2c2f33")
    message.channel.send({embed})
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar','yapimcim','yapimci',],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  kategori: 'genel',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};