const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
if (!message.member.roles.cache.get(ayarlar.banyetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 
} 
  
let kufur = await db.fetch(`kufur_${message.guild.id}`);
if (args[0] == "aç") {
if (kufur) {

const ikrudka = new Discord.MessageEmbed().setColor('RED').setDescription("**Görünüşe Göre Reklam Engel ve Küfür Engel Sistemi Zaten Aktif!**")

return message.channel.send(ikrudka);

      return;
    } else {
      db.set(`kufur_${message.guild.id}`, "Açık");

const ace = new Discord.MessageEmbed()
        .setDescription((`${basari} Reklam Engel ve Küfür Engel Sistemi Başarıyla Açıldı!`)
        .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());

return message.channel.send(ace);

    }
  } else if (args[0] == "kapat") {
    db.delete(`kufur_${message.guild.id}`);

const AsD = new Discord.MessageEmbed()
      .setDescription((`${basari}  Reklam Engel ve Küfür Engel Sistemi Başarıyla Kapandı!`)
      .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());

return message.channel.send(AsD);
    
    
    
    

    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rk","reklam"],
  permLevel: 2
};

exports.help = {
  name: "reklam-küfür",
  description: "Bot",
  usage: "reklam-engel"
};