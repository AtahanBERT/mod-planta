const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const moment = require('moment')


exports.run = async (client, message, args) => {
  
     
    let basarili = ayarlar.basariliemoji;
    let sebep = args[2];
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
   
let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
  
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");  
  
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
                    Süre: vakit,
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };
  
member.roles.set([cezalı])
db.set(`jail_roller`,message.member.roles.cache.map(role => role.id))

const logkanal = new Discord.MessageEmbed().setColor('GREEN').setDescription(`Başarılı bir şekilde ${kullanıcı} adlı kullanıcı, ${message.author.tag} tarafından \`${reason}\` sebebi ile jaile atıldı. `)
client.channels.cache.get(jaillogkanal).send(logkanal);
db.set(`jailsayısı_${message.author.id}`, 1); 
message.react('✅')
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
};