const { Discord, MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
const moment = require("moment")
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
 
module.exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.get(ayarlar.banyetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
  if (!args[0]) 
        return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı İD si gir.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
   const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.banlog)//Ban log kanalı  
   let sebeb = args.slice(1).join(" ");
   let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
   var seyfooo = args[0]
   var now = new Date()
   if(!sebeb) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
   
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bu Kullanıcı Zaten Yasaklanmış.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
               }
               message.guild.ban(seyfooo, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.fetchUser(member);
                       }
                       moment.locale("tr")
                       banlog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sunucudan Yasaklandı !**\n**Banlayan Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Banlanan Üye:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebeb}\`\n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `))
                       message.channel.send(new MessageEmbed().setDescription(`${message.author}, <@!${user.id}> sunucudan yasaklandı!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
                       message.react('✅');
                     })
                   });
 
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0,
 
};
 
exports.help = {
   name: 'ipban',
   description: 'Oylama yapmanızı sağlar.',
   usage: 'forceban <id>'
};