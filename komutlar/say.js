const ayarlar = require("../ayarlar.json");
const Discord = require("discord.js");
const db = require("quick.db");



exports.run = function(client, message, args) {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}

      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let yetkili = ayarlar.logger;

 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR"));

  
  let toplam = message.guild.memberCount;
  let online = message.guild.members.cache.filter( only => only.presence.status != "offline").size;
   const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
      
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;    let boost = message.guild.premiumSubscriptionCount
   let tag = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag)).size;
  
  const acebots = new Discord.MessageEmbed().setAuthor('Extacy Community İstatistik').setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })).setFooter('Planta Team Tarafından Yapılmıştır.')
  .setDescription(`<a:planta_siyahtac:789879331391799306> **Sunucudaki Kullanıcı Sayısı** ${toplam}
 <a:planta_siyahtac:789879331391799306> **Tagımızı Bulunduran Kullanıcı Sayısı** ${tag}
  <a:planta_siyahtac:789879331391799306> **Sesli Kanallarda Bulunan Kullanıcı Sayısı** ${count}
  <a:boost:789863691989549086> **Sunucudaki Boost Sayısı** ${boost}`);
  message.channel.send(acebots).then(x => x.delete({timeout: 25000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say",],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "say",
  desscription: "say"
}; 