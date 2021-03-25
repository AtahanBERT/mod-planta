const Discord = require('discord.js')
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
const mb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()

if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(mb.setDescripton(`${basarisiz} Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let codare = message.mentions.users.first()
let chimp = message.mentions.roles.first()

if(!args[0]) return message.channel.send(mb.setDescription(`${basarisiz} Bir kullanıcı etiketlemelisin.`))
if(!codare) return message.channel.send(mb.setDescription(`${basarisiz} **${args[0]}**, kişisini sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(mb.setDescription(`${basarisiz} Bir rol etiketlemelisin.`))
if(!chimp) return message.channel.send(mb.setDescription(`${basarisiz} **${args[1]}**, rolünü sunucuda bulamıyorum.`))
  
if(!args[2]) return message.channel.send(mb.setDescription(`${basarisiz} Ne kadar süre rolün kalacağını belirtmelisin.`))
let süre = args[2];

message.guild.members.get(codare.id).addRole(chimp.id)
message.channel.send(emb.setDescription((`${basari} ${chimp} isimli kişiye ${message.author.username} tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca ${codare} rolü verildi.`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000})); 
message.guild.members.get(codare.id).removeRole(chimp.id)
m.edit(emb.setDescription((`${basari} ${chimp}, için rol süresi doldu.`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
}, ms(süre))
})
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'süreli-rol'
};