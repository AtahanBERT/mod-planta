const { MessageEmbed } = require('discord.js')
const data = require('quick.db');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

   exports.run = async(client, message, args) => {
     
if (!message.member.roles.cache.get(ayarlar.mod) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    
    const emirhan = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!emirhan) {
    const embeds = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${basarisiz} ${message.author}, Mesaj bulunamadı!`)
  .setColor(`#3498db`)
    message.channel.send(embeds);
          } else {
  let kullanıcı = client.users.cache.get(emirhan);
  const silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  const silinenk = await data.fetch(`snipe.kanal.${message.guild.id}`)
  const embed = new MessageEmbed()
  .setAuthor(`${kullanıcı.tag} (${kullanıcı.id})`, kullanıcı.avatarURL({ dynamic: true}))
  .setDescription(silinen)
  .setColor(`#3498db`)
  .setFooter((`Mesajın silindiği kanal: ${silinenk}`), message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
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