const { MessageEmbed } = require('discord.js')
const data = require('quick.db');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

   exports.run = async(client, message, args) => {
    const emirhan = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!emirhan) {
    const embeds = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${basarisiz} Mesaj bulunamadı!`)
  .setColor(`#3498db`)
    message.channel.send(embeds);
          } else {
  let kullanıcı = client.users.cache.get(emirhan);
  const silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  const embed = new MessageEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL())
  .setDescription(silinen)
  .setColor(`#3498db`)
  .setFooter(message.guild.name, message.guild.iconURL())
  .setTimestamp()
  message.channel.send(embed) }
}
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: ['snipe'],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 