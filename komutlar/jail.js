const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const moment = require('moment')


exports.run = async (client, message, args) => {
  
     
    let basarili = ayarlar.basariliemoji;
    let sebep = args.slice(1).join(" ")
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.jailyetkili;
    let jaillogkanal = ayarlar.jaillog;
    let cezalı = ayarlar.cezalı;
    let jailsayı = db.fetch(`jailsayısı_${message.author.id}`);
    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(kullanıcı);
    let reason = args.slice(1).join(" ");




   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
   return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
   if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Jaile atabilmek için bir kullanıcı belirtmelisin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   if(!reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} Jaile atmak için sebep belirtmelisin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
  
   let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == kullanıcı.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
                    db.add('case', 1)
                    const numara = await db.fetch('case')
                    moment.locale("tr");
                  kdb.push(`kullanıcı.${kullanıcı.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: sebep,
                    Ceza: "JAIL",
                    Süre: "SINIRSIZ",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };
  
member.roles.set([cezalı])
db.set(`jail_roller_${member.id}`, member.roles.cache.map(role => role.id))
db.set(`jail_${member.id + message.guild.id}`, 'cezalı')

const logkanal = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Cezalandrıldı !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${member.user} (\`${member.user.id}\`)\n**Sebep:** \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\``)
client.channels.cache.get(jaillogkanal).send(logkanal);
db.set(`jailsayısı_${message.author.id}`, 1); 
message.react('✅')
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  permLevel: 0
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
};