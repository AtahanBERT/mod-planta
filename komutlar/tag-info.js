const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {
const cst = args.slice(0).join(" ")
if(!cst) return message.reply("Bir Tag Belirt!")
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).size

message.reply("Belirtilen Taga Sahip Bu Sunucuda `"+sonuc+"` Kişi Var!")
}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "tag-info"
}