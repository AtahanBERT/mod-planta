const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'sayaç-hoşgeldin-mesaj',
  description: 'deneme',
  run: async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`Sayaç Hoşgeldin Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`sayaçhoşgeldinmesaj_${message.guild.id}`)
return;
}

let mesaj = args.slice(0).join(' ')
if (!mesaj) return message.channel.send(`Lütfen Bir Mesaj belirtiniz ! Örnek \`-sayaç-hoşgeldin-mesaj **-sunucu-** Adlı Sunucuya -uye- Adlı Kullanıcı Katıldı . Toplam **-uyesayısı-** Kişi Olduk . **-hedef-** Kişi Olmamıza **-kalan-** Kişi Kaldı !  \`  `)

const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`Sayaç Hoşgeldin Mesajı Başarıyla \`${mesaj}\` Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`sayaçhoşgeldinmesaj_${message.guild.id}`, mesaj)
}
}