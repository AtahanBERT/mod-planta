const { MessageEmbed } = require('discord.js');
const data = require('quick.db')
const moment = require('moment')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {

  
  
//-------------------------------------------------------------------------------\\  

if (!message.member.roles.cache.get(ayarlar.banyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.banlog)//Ban log kanalı  
  
//-------------------------------------------------------------------------------\\


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
  
if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))){
if(!args[1] || isNaN(args[1])) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x330033').setTimestamp().setDescription(`**Banlanan Üye:** ${user.tag} (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp().setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
}

let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanici.bannable)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı yasaklanamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Kendini sunucudan yasaklayamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir botu sunucudan yasaklayamazsın`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sunucu sahibini sunucudan yasaklayamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
kullanici.ban({reason: sebep}).then(x => message.react('✅')).catch();
    let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == kullanici.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
                    const numara = await data.fetch('case')
                      moment.locale("tr");
                  kdb.push(`kullanici.${kullanici.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: sebep,
                    Ceza: "BAN",
                    Süre: "Sınırsız",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };    
message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, Tarafından ${kullanici} \`${sebep}\` Sebebiyle Sunucudan Yasaklandı.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()) 
banlog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sunucudan Yasaklandı !**\n**Banlayan Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Banlanan Üye:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `))
}

exports.conf = {
    aliases: ['yasakla'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ban'
  };