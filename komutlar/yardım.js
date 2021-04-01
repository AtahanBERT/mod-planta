const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:plantacarp:815252488168931368> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}

    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;



const ace = new Discord.MessageEmbed()
.setFooter('Extacy Community Tarafından Yapılmıştır.')
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setDescription(`
> **\`${prefix}pp -> .pp veya .pp @üye\`** 
> **\`${prefix}sicil -> .sicil veya .sicil @üye\`** 
> **\`${prefix}yetki -> .yetki <giriş orta üst alty ortay üsty yönetim> @üye\`** 
> **\`${prefix}rolver -> .rolver @üye @rol\`** 
> **\`${prefix}rolal -> .rolal @üye @rol\`** 
> **\`${prefix}ban -> .ban @üye <sebep>\`** 
> **\`${prefix}kick -> .kick @üye <sebep>\`**
> **\`${prefix}git -> .git @üye\`** 
> **\`${prefix}çek -> .çek @üye\`** 
> **\`${prefix}say -> .say\`** 
> **\`${prefix}sohbet-aç -> .sohbet-aç\`** 
> **\`${prefix}sohbet-kapat -> .sohbet-kapat\`** 
> **\`${prefix}mute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}unmute -> .unmute @üye\`** 
> **\`${prefix}smute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}sunmute -> .unmute @üye\`** 
> **\`${prefix}jail -> .jail @üye <Sebep>\`**
> **\`${prefix}unjail -> .unj @üye <sebep> \`**
> **\`${prefix}unjail-e (Erkek İçin) -> .ue @üye\`** 
> **\`${prefix}unjail-k (Kız İçin) -> .uk @üye\`** 
> **\`${prefix}emojiekle-gif (gifli emoji ekler) -> .eegif \`**
> **\`${prefix}emojiekle-png (png emoji ekler) -> .eepng \`** 
> **\`${prefix}isimdeğiştir -> .isim @üye <isim> \`** `)
 message.channel.send(ace)
  
}
exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help','yardim'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}