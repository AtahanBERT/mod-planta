const ayarlar = require("../ayarlar.json");
const Discord = require("discord.js");
const db = require("quick.db");



exports.run = function(client, message, args) {
  
   

      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let yetkili = ayarlar.mod;

 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return

  
  let toplam = message.guild.memberCount;
  let online = message.guild.members.cache.filter( only => only.presence.status != "offline").size;
   const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
      
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;    let boost = message.guild.premiumSubscriptionCount
   let tag1 = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag)).size;
   let tag2 = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag2)).size;
   let tag = tag1 + tag2;
  
  const acebots = new Discord.MessageEmbed().setAuthor('Extacy Community İstatistik').setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })).setFooter('Extacy Community Tarafından Yapılmıştır.')
  .setDescription(`
  **Sunucudaki Kullanıcı Sayısı** ${toplam}
  **Sesli Kanallarda Bulunan Kullanıcı Sayısı** ${count}
  **Sunucudaki Boost Sayısı** ${boost}`);
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