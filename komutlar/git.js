const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.`))}
}

    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let kanal = ayarlar.botkomut;
  
  if(message.channel.id !== kanal) return message.react(basarisiz);
  
  
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  
  if (!uye) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Ses odasına gidilecek üyeyi belirtmelisin!`)).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} İkiniz veya ikinizden birisi ses kanalında değil!`)).then(x => x.delete({timeout: 5000}));
 {
      await message.member.voice.setChannel(uye.voice.channelID);
  }  {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send({embed: new Discord.MessageEmbed().setColor('BLUE').setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(uye.voice.channelID);
          msj.delete();
    let striga = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${basarisiz} ${uye} Odaya Çekilme Teklifini Reddetti`)
message.channel.send(striga)
}
})
}
	
      );
    };
  };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'git',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}