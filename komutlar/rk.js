const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
if (!message.member.roles.cache.get(ayarlar.logger) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  if (!args[0]) {

const peka = new Discord.MessageEmbed().setColor("RED").setDescription(`Doğru bir argüman giriniz. Aç veya kapat`)

return message.channel.send(peka);

    return;
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

        .setColor("GREEN")
        .setDescription("Reklam Engel ve Küfür Engel Sistemi Başarıyla Açıldı!")

return message.channel.send(ace);

    }
  } else if (args[0] == "kapat") {
    db.delete(`kufur_${message.guild.id}`);

const AsD = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setDescription("Reklam Engel ve Küfür Engel Sistemi Başarıyla Kapandı!")

return message.channel.send(AsD);
    
    
    
    

    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rk"],
  permLevel: 2
};

exports.help = {
  name: "reklam-küfür",
  description: "Bot",
  usage: "reklam-engel"
};