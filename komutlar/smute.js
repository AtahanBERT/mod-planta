const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require("../ayarlar.json");

const prefix = ayarlar.prefix;


exports.run = async (client ,message, args) =>{
  
    
      let yetkili = ayarlar.muteyetkili;
      let ceza = ayarlar.cezalog;
      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let susturulmuş = ayarlar.susturulmuş;
      let mutelogkanal = ayarlar.mutelog;
      let mutesayı = db.fetch(`mutesayısı_${message.author.id}`);
      let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      let mutezaman = args[1];
      let sebep = args.slice(2,args.length).join(" ");

    if (!message.member.hasPermission("ADMINISTRATOR") & !message.member.roles.cache.get(yetkili) ) return message.react(basarisiz); 
    if (!mutekisi) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Lütfen bir kullanıcı etiketleyiniz!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= mutekisi.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    if (!mutezaman) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Lütfen bir zaman giriniz! \n 1 Saniye = 1s \n 1 Dakika = 1m \n 1 Saat = 1h \n 1 Gün = 1d`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sesde Susturmak için sebep belirtmelisin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    await mutekisi.voice.setMute(true, sebep);
    const logkanal = new Discord.MessageEmbed().setDescription(`${basarili} Başarılı bir şekilde ${mutekisi} adlı kullanıcı, ${message.author.tag} tarafından \`${sebep === "" ? "Sebep belirtilmemiş." : sebep}\` sebebi ile \`${args[1]}\` süresi boyunca susturuldu!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().then(x => x.delete({timeout: 5000}));
    client.channels.cache.get(mutelogkanal).send(logkanal)
  

  
 message.react('✅')
  db.add(`mutesayısı_${message.author.id}`, 1);


  setTimeout(function() {
mutekisi.voice.setMute(false, sebep)
    message.channel.send(new Discord.MessageEmbed().setColor('#bae800').setDescription(`${basarisiz} <@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`)
);
  }, ms(mutezaman));
};

exports.conf = {

  enabled: true,
  guildOnly: true,
  aliases: ["smute"],
  permLevel: 0
};

exports.help = {

  name: "smute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};
