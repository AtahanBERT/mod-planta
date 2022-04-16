const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  
  
  
//-------------------------------------------------------------------------------\\

if (!message.member.roles.cache.get(ayarlar.muteyetkili) & !message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const mutelog = message.guild.channels.cache.find(c => c.id === ayarlar.mutelog)//Mute logu
const muterol = message.guild.roles.cache.find(r => r.id === ayarlar.susturulmuş)//Muteli rolü

//-------------------------------------------------------------------------------\\

let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, lütfen bir kullanıcı etiketle !`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('0x800d0d').setDescription(`${basarisiz} ${message.author}, lütfen mute atmam gereken kullanıcı belirt !`);
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
} else {
let zaman = args[1]   
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if (!zaman) { message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Lütfen Bir zaman dilimi belirtin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
} else {
let sebep = args.slice(2).join(" ")
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Lütfen Bir sebep belirtiniz.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
                
let zamandilimi = zaman
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
                  
let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar; 
               {
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == member.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${member.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "MUTE",
Süre: zamandilimi,
cezano: numara,
Tarih: (`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
});
};
  
moment.locale("tr")
data.set(`muteli_${member.guild.id + member.id}`, 'muteli')
data.set(`süre_${member.id + member.guild.id}`, zamandilimi)
                 
message.react('✅')

message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`${basari} ${message.author} tarafından ${member} **${sebep}** sebebiyle **${zamandilimi} boyunca** mute atıldı`));
mutelog.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('ffdb55')
.setTimestamp()
.setDescription(`
**Metin Kanallarında Susturuldu !**
**Kullanıcı:** <@${member.id}> (\`${member.id}\`)
**Yetkili:** <@${message.author.id}> (\`${message.author.id}\`)
**Süre:** \`${zamandilimi}\`
**Sebep** \`${sebep}\`
**Tarih:** (\`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(3,"hours").format("YYYY HH:mm:ss")}\`)
        
`))
mute.roles.add(muterol)
message.react('✅')
} 
setTimeout(async function() {
mute.roles.remove(muterol)
mutelog.send(
new MessageEmbed()
.setColor('#494459')
.setTimestamp()
.setDescription(`
**Metin Kanallarında Susturulması Bitti !**
**Kullanıcı:** <@${member.id}> (\`${member.id}\`)
**Süre:** \`${zamandilimi}\`
**Tarih:** (\`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(3,"hours").format("YYYY HH:mm:ss")}\`)`)
);
}, ms(zaman));
        
}}}
 
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["mute"],
    permLevel: 0,
    name: "mute"
  }
  
  exports.help = {
    name: "mute"
  };