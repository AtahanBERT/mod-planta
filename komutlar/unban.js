const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
exports.run = async (bot , message, args) => {
  
   
  let basari = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
  if(!message.member.roles.cache.get(ayarlar.banyetkili)) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Bu Komutu Kullanmaya Yetkin Yok`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.banlog)//Ban log kanalı  
  
   const user = message.mentions.members.first()

    let member = user || args[0]
    
    const banlılar = await message.guild.fetchBans(true)
    
    const banlımember = banlılar.find(m => `${m.user.username}#${m.user.discriminator}` === member || m.user.id === member)
    
    let sebep = args.slice(1).join(' ');

    let kanal = bot.channels.get == ayarlar.banlog //log kanal id

    if(!banlımember) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Lütfen Banı Açılcak Bir Kullanıcı İD Belirtin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
    if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Lütfen Bir Sebep Belirtin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    if(!sebep) sebep = `bir sebep belirtilmemiş`

    try{
      
    message.channel.send(new MessageEmbed().setDescription(`${basari} **${banlımember.user}** Kullanıcısı **${message.author}** Tarafından **${sebep}** Nedeniyle banı kaldırıldı.`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    message.guild.members.unban(banlımember.user)
    message.react('✅');
   
    }catch(err){   
      console.log(err.message)
    
    }
   
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
moment.locale("tr");
  banlog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sunucudan Yasaklanması Açıldı!**\n**Banı Açan Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Banı Açılan Üye:** ${banlımember.user.tag} (\`${banlımember.user.id}\`)\n**Sebep:** \`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `));
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unban'],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'kullanıcı yasağını kaldırır.',
  usage: 'unban'
}; 