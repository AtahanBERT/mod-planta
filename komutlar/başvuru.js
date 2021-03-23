const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

let rol = ayarlar.başvuruverilcekrol;
let yetkili = ayarlar.başvuruyetkirol;
let log = ayarlar.başvurulog;

module.exports.run = async (client, message, args) => {
  
  if (args[0] === "onayla") {
      if (!message.member.roles.cache.get(yetkili))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    
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
    mem.send(
      `${basari} Hey Tebrikler ` +
        message.guild.name +
        " Sunucusunda Yetkili Olma Talebin Onaylandı!"
    );
    db.delete(`basvuru.${mem.id}`);
  } else {
    if (args[0] === "red") {
      if (!message.member.roles.cache.get(yetkili))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
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
      mem.send(
        `${basarisiz} Hey Üzgünüm ` +
          message.guild.name +
          " Sunucusunda Yetkili Olma Talebin Reddedildi!"
      );
      db.delete(`basvuru.${mem.id}`);
    } else {
      let s1 = "İsmin Nedir?";
      let s2 = "Kaç Yaşındasın?";
      let s3 = "Bize Ne Gibi Katkıların Ola Bilir?";
      if (!args[0])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Başvuru Talimatları")
            .setColor("BLUE")
            .setDescription(
              `Başvuru Soruları:\n**1. ${s1}\n2. ${s2}\n3. ${s3}**\n\n\`Örnek Kullanım:\` __m!başvuru Atahan 17  Fazla Davet Yapa Bilirim__`
            )
            .setTimestamp()
            .setFooter("Planta Tarafından Yapılmıştır.")
        );
      let data = db.get(`basvuru.${message.author.id}`);
      if (!data) {
        if (!args[0]) return message.reply("**İsmin Nedir Yazman Gerek!**");
        if (!args[1]) return message.reply("**Kaç Yaşındasın Yazman Gerek!**");
        if (!args.slice(2).join(" "))
          return message.reply(
            "**Bize Ne Gibi Katkıların Olur Yazman Gerek!**"
          );
        db.set(`basvuru.${message.author.id}`, "onayla");
        let ch = message.guild.channels.cache.get(log);
        let csd = new Discord.MessageEmbed()
          .setTitle("Yeni Başvuru")
          .setColor("GREEN")
          .setThumbnail(message.guild.iconURL())
          .setDescription(
            `Başvuran: ${message.author}\nBaşvuran ID: \`${
              message.author.id
            }\`\n\nBaşvuran Bilgileri:\n**İsim:** \`${args[0]}\`\n**Yaş:** \`${
              args[1]
            }\`\n**Ne Yapa Bilir:** \`${args.slice(2).join(" ")}\``
          )
          .setTimestamp()
          .setFooter("Planta Tarafından Yapılmıştır.");
        return ch.send(csd).then(mr => {
          message.react('✅')
          message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Başvurun sırayı eklendi <@&${yetkili}> rolündeki yetkililerin cevaplamısını bekle!`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}));
        message.channel.send(`<@&${yetkili}> Bu Kanala Bakmayı Unutma <#${log}>`);
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