const Discord = require('discord.js')
exports.run = (client, message, args) => {
message.guild.fetchBans().then(mr => {

const cse1 = new Discord.MessageEmbed()
.setTitle(`Hiç Yasaklı Üye Yok!`)
.setColor("BLUE")
.setFooter("Made By. Code Share")
.setTimestamp()

if(mr.first() == null) return message.channel.send(cse1)

const cse2 = new Discord.MessageEmbed()
.setTitle("Sunucudan Yasaklanan Üyeler")
.setColor("BLUE")
.setDescription("```"+mr.first().tag+"```")
.setFooter("Planta Team Tarafından Yapılmıştır.")
.setTimestamp()
message.channel.send(cse2)
})
}
module.exports.conf = {
aliases: []
}
module.exports.help = {
name: 'banlist'
}