const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

client.on("ready", () => {
  const gir = ayarlar.botses;
  client.channels.cache.get(gir).join();
  });      //


client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
    msg.channel.send('`\`\ ');
  }
});


client.on('messageDelete', message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})

////////////////////////////KÜFÜR ENGEL////////////////////////////////


client.on("userUpdate", async (oldUser, newUser) => {  
    
  if (oldUser.username !== newUser.username) {
  
          let tag = ayarlar.tag
          let sunucu = ayarlar.sunucu
          let kanal = ayarlar.tagkanal
          let rol = ayarlar.tagrol

          

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(` ${newUser} adlı kullanıcı (\`${tag}\`) tagımızı alarak bizi mutlu etti. Tagımızı aldığın için sana <@&${rol}> adlı rolü verdim. Ailemize Hoşgeldin :)`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice(("ま ").length))
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname("ま "+client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);
  }//Planta Team
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(` ${newUser} adlı kullanıcı (\`${tag}\`) tagımızı çıkararak bizi üzdü. Tagımızı çıkardığın için senden <@&${rol}> adlı rolü aldım. Ailemize tekrardan bekleriz...`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);//Planta Team
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice(("ま").length))
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname("ま "+client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);

    
  } 
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
} 
});
/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////



client.off("guildMemberAdd", member => {
      let yetkili = ayarlar.kayıtyetkili
          let kayıtsohbet2 = ayarlar.kayıtsohbet //acebots 


  let guild = member.guild;

  const channel = member.guild.channels.cache.find(channel => channel.id === (kayıtsohbet2)); /// Kayıt Kanalı Adı
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs", //acebots 
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",//acebots
        "09": "Eylül", //acebots 
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 

let user = client.users.cache.get(member.id);
require("moment-duration-format"); //acebots 

   const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
   var kontrol = [];

if(gün < 7) {
 kontrol = '**Şüphelidir**' 
} if(gün > 7) {//acebots
kontrol = '**Güvenlidir**' 
} 
let kanal = ayarlar.kayıtsohbet //acebots 
 if(!kanal) return;
  
     client.channels.cache.get(kanal).send(`
    ${member.user} Aramıza Hoşgeldin Senin Gelmenle Beraber **${guild.memberCount}** Kişiye Ulaştık
Sunucu kurallarımız <#808828129187201105> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
Hesabın **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}** zamanında kurulmuş olup ${kontrol}.
<@&${yetkili}> etiketli yetkililer seninle ilgilenecektir.`)
});


//////////////////////////////////////////////////////////OTO ROL//////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
 const rolver = ayarlar.kayıtsız;
    member.roles.add(rolver); 
});


////////////////////////////////////REKLAM ENGEL////////////////////////////////


client.on("message", async message => {

  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg"];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let ikrudka = new Discord.MessageEmbed()
            .setDescription(` <@${message.author.id}> Sunucuda reklam yapmak yasaktır!`)
         return message.channel.send(ikrudka).then(x => x.delete({timeout: 3000}));
        }
        if (uyarisayisi === 1) {
          let ikrudka = new Discord.MessageEmbed().setDescription(` <@${message.author.id}> Sunucuda reklam yapmak yasaktır.`)
        return message.channel.send(ikrudka).then(x => x.delete({timeout: 3000}));
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({reason: `Reklam Yapma Orsp Coc!`});
          let ikrudka = new Discord.MessageEmbed()
 
           .setColor("#0054ff")
            .setDescription(` <@${message.author.id}> Uyarılmasına Rağmen \`3\` Kez Reklam Yaptığı İçin Sunucudan Atıldı!`)
         return message.channel.send(ikrudka).then(x => x.delete({timeout: 3000}));
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({reason: `ORSP COC!`});
          db.delete(`reklamuyari_${message.author.id}`);
          let ikrudka = new Discord.MessageEmbed()
            .setDescription(` <@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`)
         return message.channel.send(ikrudka).then(x => x.delete({timeout: 3000}));}}}}});

client.on("message", async message => {

  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "amk","sikim","siksem","PEZEVENK","pezevenk","kaltak","KALTAK","İBNE","İBNE","evladi","orsb","orsbcogu","amnskm","anaskm","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq"
      ,"YAVŞAK","SÜRTÜK","sürtük","AMCIK","amcık","amcik","surtuk","SURTUK","oruspu çocuğu","OROSPU COCUGU","ORUSPU COCUGU","oruspu çocugu","oruspu çocuğu","sikecem","SİKECEM","Orospu Cocuğu","orospu","piç","yavşak","Amını Sikim","amk","aq","Götünü Sikim","ANANI SİKİM","SİKİM","AMK","OROSPU ÇOCUĞU","PİÇ","YAVŞAK","YARRAK","YARAK","yarrak","yarak","gavat","lavuk","LAVUK","GAVAT","şerefsiz","ŞEREFSİZ",
    "Ananı Sikim",
    "Anani Sikim"];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {

      {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
        }
        }}}}});



//-------------------------------------------------------------------------\\\ModLog//----------------------------------------------------------------------------------\\

const botadi = "Planta Tarafından Yapılmıştır."
const kanal = ayarlar.modlog
const chat = ayarlar.chatlog

  client.on('guildBanAdd', async (guild, user) => {
  let entry = await guild.fetchAuditLogs({type: 'BAN_ADD'}).then(audit => audit.entries.first())
  let yetkili = client.users.cache.get(entry.executor.id)
  let modlogs = kanal
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#080000")
    .setDescription(`\`${user.tag}\` adlı kullanıcı sunucudan yasaklandı. Yasaklayan kişi <@${yetkili.id}> `)
    .setFooter(`${botadi}`)
    .setTimestamp()
    modlogkanal.send(embed)
  }});

  client.on('guildBanRemove', async (guild, user) => {
    let entry = await guild.fetchAuditLogs({type: 'BAN_REMOVE'}).then(audit => audit.entries.first())
    let yetkili = client.users.cache.get(entry.executor.id)
    let modlogs = kanal
    const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#080000")
    .setDescription(`\`${user.tag}\` adlı kullanıcının yasaklaması kaldırıldı. Yasaklamayı kaldıran kişi <@${yetkili.id}> `)
    .setFooter(`${botadi}`)
    .setTimestamp()
    modlogkanal.send(embed)
  }});



  client.on('channelCreate', async channel => {
    let modlogs = kanal
    let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
    let user = client.users.cache.get(entry.executor.id)
    const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
    if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setDescription(`\`${channel.name}\` adlı metin kanalı oluşturuldu. Kanalı oluşturan kişi <@${user.id}>`)
      .setFooter(`Herşey sizin için 🤍`)
      .setTimestamp()
      modlogkanal.send(embed)
    }
      if (channel.type === "voice") {
      let embed = new Discord.MessageEmbed()
       .setColor("#fffa00")
       .setDescription(`\`${channel.name}\` adlı ses kanalı oluşturuldu. Kanalı oluşturan kişi <@${user.id}>`)
       .setFooter(`${botadi} `)
       .setTimestamp()
      modlogkanal.send(embed)}}});

   client.on('channelDelete', async channel => {
      let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
      let user = client.users.cache.get(entry.executor.id)
    let modlogs = kanal
      const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
      if(!modlogs) return;
      if(modlogs) {
      if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setDescription(`\`${channel.name}\` adlı metin kanalı silindi. Kanalı silen kişi <@${user.id}>`)
        .setFooter(`${botadi} `)
       .setTimestamp()
     modlogkanal.send(embed)}
      if (channel.type === "voice") {

        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setDescription(`\`${channel.name}\` adlı ses kanalı silindi. Kanalı silen kişi <@${user.id}>`)
        .setFooter(`${botadi} `)
        .setTimestamp()
        modlogkanal.send(embed)
       }
      }
    });

client.on('roleDelete', async role => {
    let modlogs = kanal
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${role.name}\` adlı rol silinmiştir. Rolü silen kişi <@${user.id}>`)
    .setFooter(`${botadi} `)
    .setTimestamp()
    modlogkanal.send(embed)}});

client.on('emojiDelete', async emoji => {
    let modlogs = kanal
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${emoji.name}\` adlı emoji silinmiştir. Emojiyi silen kişi <@${user.id}>`)
    .setFooter(`${botadi} `)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});
  

client.on('roleCreate', async role => {
    let modlogs = kanal
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${role.name}\` adlı rol oluşturuldu. Rolü oluşturan kişi <@${user.id}>`)
    .setFooter(`${botadi} `)
    .setTimestamp()

    modlogkanal.send(embed)
  }
});


   client.on('emojiCreate', async emoji => {
    let modlogs = kanal
    let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
    let user = client.users.cache.get(entry.executor.id)
    const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
    let embed = new Discord.MessageEmbed()
     .setColor("#fffa00")
     .setDescription(`\`${emoji.name}\` adlı emoji oluşturuldu. Emojiyi oluşturan kişi <@${user.id}>`)
     .setFooter(`${botadi} `)
     .setTimestamp()
    modlogkanal.send(embed)}});


client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(prefix)) return;
  let sc = chat;
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${newMessage.channel.name}\` adlı kanalda mesaj değiştirilmiştir. Mesajı değiştiren kişi <@${newMessage.author.id}>`)
    .addField("Eski Mesaj", ` ${ "``" + oldMessage.content + "``" } `, true)
    .addField("Yeni Mesaj",` ${"``" + newMessage.content + "``"}  `, true )
    .addField("Mesaj ID",` \`\`${newMessage.id}\`\`  `,true) 
    .setFooter(`${botadi} `)
    .setTimestamp()
    scbul.send(embed); });

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(prefix)) return;
  let sc = chat;
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${deletedMessage.channel.name}\` adlı kanalda mesaj silindi. Mesajın sahibi <@${deletedMessage.author.id}>`)
    .addField("Silinen Mesaj:",` ${"``" + deletedMessage.content + "``"}`,true)
    .addField("Silinen Mesaj İd:", ` ${"``" + deletedMessage.id + "``"} `,true)
    .setFooter(`${botadi} `)
    .setTimestamp()
  scbul.send(embed);
});



client.on("guildCreate", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount
guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
embed.setColor("RANDOM")

embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
})
client.on("guildDelete", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle("Sunucudan Attılar Piçler")
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
  embed.setColor("RED")
embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
});




client.on('userUpdate', async user => {
    let sunucuid = "786554677855518730"; 
    let tag = "ア"; 
    let cezalırol = "786556114204360724";
    let kayıtsız = "789807193646039041";
    let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'まjail-chat');//nereye mesaj atmasını istiyorsanız, o kanalın tam ismini yazıniz!
    if (!tag) return;
    if (!cezalırol) return;
    if (!channel) return;
    let member = client.guilds.cache.get(sunucuid).members.cache.get(user.id);
    if (!member) return;
    if (!member.roles.cache.has(cezalırol)) {
      if (member.user.username.includes(tag)) {
        setTimeout(function(){
        member.roles.cache.forEach(r => {member.roles.remove(r.id)})
        member.roles.add(cezalırol)
        },1000)
        setTimeout(function(){
        const tagalma = new Discord.MessageEmbed()
        .setTitle(`Ceza Mahkemesi`)
        .setColor("#e6f3b4")
        .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı tüm yetkilerini alıp cezalı taga attım eğer tagını silerse yeniden kayıt olup aramıza katılabilir`)
        .setFooter(member.user.username,member.user.avatarURL())
        channel.send(tagalma)
      },2000)
      setTimeout(function(){
        user.send(`${tag}'ı aldığından dolayı malesef ki cezalıya atmak zorunluğunda kaldım tagını kaldırarak aramıza tekrar katılabilirsin 😊`)
      },3000)
    }
    }else{
      if (!member.user.username.includes(tag)) {
        setTimeout(function(){
          member.roles.remove(cezalırol)
          member.roles.add(kayıtsız)
        },1000)
        setTimeout(function(){
        const tagsilme = new Discord.MessageEmbed()
        .setColor("#e6f3b4")
        .setTitle(`Ceza Mahkemesi`)
        .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı affedildi ve tekrardan kayıtsıza atıldı.`)
        .setFooter(member.user.username,member.user.avatarURL())
        channel.send(tagsilme)
        },2000)
        setTimeout(function(){
          user.send(`${tag} ı Aldığın tagı geri çıkardığın için affedildin aramıza tekrardan hoşgeldin. 😊`)
        },3000)
      }
    }
  });


client.on("guildMemberAdd", member => {
  let tag = "ア"
  if(member.user.username.includes(tag)){
  member.roles.add("786556114204360724")
  member.roles.remove("789807193646039041")
  member.send(`Görünüşe bakılırsa ${tag} adlı tagda bulunuyorsun aramıza katılmak için tagı kaldırabilirsin`)
  }
  });

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.cache.get(data2)
if(!rol) return;
let kişi = member.guild.members.cache.get(member.id)
kişi.roles.add(rol.id);
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`)
  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
});


client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "ま Muted");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.susturulmuş)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove('815258071898128394');
  }, (süre));
}
});


client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === "ま Jail");
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.cezalı)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove('786556114204360724');
  }, (sürejail));
}
});


//DDOS KORUMASI\\
client.on('message', msg => {

if(client.ping > 550) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")

           sChannel.send(`⚠UYARI⚠\n \n🔸 Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi!\n🔸 Yeni Bölge: ${yenibölge} `+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log("🌍 Bölge:" + g.region))
           .then(g => msg.channel.send("✅ Bölge **"+ g.region  + " Olarak Değiştirildi! 🏡"))
           .then(msg.reply('✅ Bölge Değiştirildi! ')) 
           .catch(console.error);
}});

client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

});