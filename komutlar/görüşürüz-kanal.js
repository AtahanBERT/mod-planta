const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Görüşürüz Kanal`)
.setColor('BLACK')
.setDescription(`Görüşürüz Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`bbkanal_${message.guild.id}`)
return;
}

   let kanal = message.mentions.channels.first()

if (!kanal) return message.channel.send(`Lütfen Bir Kanal belirtiniz ! `)

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Görüşürüz Kanal`)
.setColor('BLACK')
.setDescription(`Görüşürüz Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`bbkanal_${message.guild.id}`, kanal.id)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'görüşürüz-kanal'
}