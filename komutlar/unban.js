const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (bot , message, args) => {
  
  let basari = ayarlar.basarilismoji;
  let basarisiz = ayarlar.basarisizemoji;
  if(!message.member.roles.get == ayarlar.banyetkili)return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Bu Komutu Kullanmaya Yetkin Yok`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

   const user = message.mentions.members.first()

    let member = user || args[0]
    
    const banlılar = await message.guild.fetchBans(true)
    
    const banlımember = banlılar.find(m => `${m.user.username}#${m.user.discriminator}` === member || m.user.id === member)
    
    let sebep = args.slice(1).join(' ');

    let kanal = bot.channels.get == ayarlar.banlog //log kanal id

    if(!banlımember) return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} Lütfen Banı Açılcak Bir Kullanıcıyı Belirtin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
    if(!sebep) sebep = `bir sebep belirtilmedi`

    try{
      
    message.channel.send(new MessageEmbed().setDescription(`${basari} **${banlımember.user}** Kullanıcısı **${message.author}** Tarafından **${sebep}** Nedeniyle banı kaldırıldı.`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}))
    message.guild.unban(banlımember.user)
    message.react('✅');
   
    }catch(err){   
      console.log(err.message)
    }
   

     let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.guild.name} Bilgi`, message.guild.iconURL)
    .addField("**Banı Açan Üye:**", `**Adı:** ${message.author}\n **İD'si:** ${message.author.id}`)
    .addField("**Banı Açılma Nedeni:**", `${sebep}`)
    .addField("**Banı Açılan Üye:**", `**Adı:** ${banlımember.user.tag}\n **İD'si:** ${banlımember.user.id}`)
    .setTimestamp()
    .setFooter("Ban Bilgisi", `${banlımember.user.displayAvatarURL}`)
 
         if(!kanal || kanal === null) return
    kanal.send(embed)
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unban'],
  permLevel: 4
};

exports.help = {
  name: 'unban',
  description: 'kullanıcı yasağını kaldırır.',
  usage: 'unban'
}; 