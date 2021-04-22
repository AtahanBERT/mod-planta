const { Discord, MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
 
module.exports.run = async (client, message, args) => {
 if (message.author.id !== ["429357746002067493","448377317065097228","794721378724741120"]) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (!args[0]) {
        return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı İD si gir.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   }
   var sebeb = args.slice(1).join(" ");
   var seyfooo = args[0]
   var now = new Date()
   if (!sebeb) {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bu Kullanıcı Zaten Yasaklanmış.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
                 if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
               }
               message.guild.members.ban(seyfooo, sebeb)
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
                       message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, <@!${user.id}> adlı kullanıcı banlandı`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
                   })
                   .catch(error => {
                       message.channel.send(`:x: Bir Hata Oluştu`);
                       console.error(':x: Hata:', error);
                   });
           });
   } else {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bu Kullanıcı Zaten Yasaklanmış.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
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
                       message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, <@!${user.id}> sunucudan yasaklandı`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
                   })
                   .catch(error => {
                       message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir Hata Oluştu`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
                       console.error(' Hata:', error);
                   });
           });
   }
 
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['forceban'],
   permLevel: 0,
 
};
 
exports.help = {
   name: 'forceban',
   description: 'Oylama yapmanızı sağlar.',
   usage: 'forceban <id>'
};