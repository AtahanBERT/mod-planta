const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
if (!message.member.roles.cache.get(ayarlar.logger) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  if (!args[0]) {
    
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));


    return;
  }
let kufur = await db.fetch(`saas_${message.guild.id}`);
if (args[0] == "aç") {
if (kufur) {

return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Görünüşe göre sa-as sistemi zaten aktif!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

      return;
    } else {
      db.set(`saas_${message.guild.id}`, "Açık");

return message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Sa-as sistemi başarıyla açıldı!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    db.delete(`saas_${message.guild.id}`);

return message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Sa-as sistemi başarıyla kapandı!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.react('✅')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "sa-as",
  description: "sa-as sitemini açar/kapatır",
  usage: "sa-as aç/kapat"
};