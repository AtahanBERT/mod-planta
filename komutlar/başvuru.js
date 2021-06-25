const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;
let rol = ayarlar.başvuruverilcekrol;
let kanal = ayarlar.başvurukanal;
let yetkili = ayarlar.başvuruyetkirol;
let log = ayarlar.başvurulog;

module.exports.run = async (client, message, args) => {
  
if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('0x800d0d').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}))}
}
  
  if (args[0] === "onayla") {
      if (!message.member.roles.cache.get(yetkili))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    
    let mem;
    let meme = message.mentions.members.first();
    let memem = message.guild.members.cache.get(args[1]);
    if (meme) {
      mem = meme;
    }
    if (memem) {
      mem = memem;
    }
    if (!mem) {
      message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin veya ID girmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
    }
    let data = db.get(`basvuru.${mem.id}`);
    if (!data)
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bahesedilen üyenin başvuru talebi bulunamadı.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

    mem.roles.add(rol);
    message.react('✅')
    message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarıyla başvurusu onaylandı!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
    mem.send(new Discord.MessageEmbed().setDescription(
      `${basari} ${mem}, Tebrikler ${message.guild.name} Sunucusunda Yetkili Olma Talebin Onaylandı!`).setFooter(`Tyfers Başvuru Sistemi`, message.guild.iconURL({dynamic: true})).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp());
    db.delete(`basvuru.${mem.id}`);
  } else {
    if (args[0] === "red") {
      if (!message.member.roles.cache.get(yetkili))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
      let mem;
      let meme = message.mentions.members.first();
      let memem = message.guild.members.cache.get(args[1]);
      if (meme) {
        mem = meme;
      }
      if (memem) {
        mem = memem;
      }
      if (!mem) {
        message.reply(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin veya ID girmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
      }
      let data = db.get(`basvuru.${mem.id}`);
      if (!data)
        return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bahesedilen üyenin başvuru talebi bulunamadı.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

      message.react('✅')
      message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başarıyla başvurusu reddedildi!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
      mem.send(new Discord.MessageEmbed().setDescription(
        `${basarisiz} ${mem}, Üzgünüm ${message.guild.name} Sunucusunda Yetkili Olma Talebin Reddedildi!`).setFooter(`Tyfers Başvuru Sistemi`, message.guild.iconURL({dynamic: true})).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp());
      db.delete(`basvuru.${mem.id}`);
    } else {
      let s1 = "Günde Kaç Saat Aktif Olursun?";
      let s2 = "Günde Kaç Kayıt Yapabilirsin?";
      let s3 = "Başka Bize Ne Gibi Katkıların Ola Bilir?";
      let s4 = "NOT: Başvuru Odasını Açmak İçin Tag Alın.";
      if (!args[0])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Başvuru Talimatları")
            .setColor("BLUE")
            .setDescription(
              `Başvuru Soruları:\n**1. ${s1}\n2. ${s2}\n3. ${s3}**\n\n\`Örnek Kullanım:\` __m!başvuru 9 12 Davet Yapa Bilirim__\n${s4}`
            )
            .setTimestamp()
            .setFooter("Tyfers Tarafından Yapılmıştır.")
        );
      
      let data = db.get(`basvuru.${message.author.id}`);
      if (!data) {
        if (!args[0]) return message.reply("**Günde Kaç Saat Aktif Olursun Yazman Gerek!**").then(x => x.delete({timeout: 3000}));
        message.delete()
        if (!args[1]) return message.reply("**Günde Kaç Kayıt Yapabilirsin Yazman Gerek!**").then(x => x.delete({timeout: 3000}));
        message.delete()
        if (!args.slice(2).join(" "))
          return message.reply(
            "**Başka Bize Ne Gibi Katkıların Olur Yazman Gerek!**"
          ).then(x => x.delete({timeout: 3000}));
        message.delete()
        db.set(`basvuru.${message.author.id}`, "onayla");
        let ch = message.guild.channels.cache.get(log);
        let csd = new Discord.MessageEmbed()
          .setTitle("Yeni Başvuru")
          .setColor("GREEN")
          .setThumbnail(message.guild.iconURL())
          .setDescription(
            `Başvuran: ${message.author}\nBaşvuran ID: \`${
              message.author.id
            }\`\n\nBaşvuran Bilgileri:\n**Aktiflik:** \`${args[0]}\`\n**Kayıt:** \`${
              args[1]
            }\`\n**Başka Ne Yapa Bilir:** \`${args.slice(2).join(" ")}\``
          )
          .setTimestamp()
          .setFooter("Tyfers Tarafından Yapılmıştır.");
        return ch.send(csd).then(mr => {
          message.react('✅')
          message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başvurun sırayı eklendi <@&${yetkili}> rolündeki yetkililerin cevaplamısını bekle!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
        ch.send(`<@&${yetkili}>`);
        });
      } else {
        message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Beklenen bir başvurun var.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
      }
    }
  }
};
module.exports.conf = {
  aliases: ["b"]
};

module.exports.help = {
  name: "başvuru"
};