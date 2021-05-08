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



const extacy = new Discord.MessageEmbed()
.setTitle(`Extacy Community Yardım`)
.setFooter('Extacy Community Tarafından Yapılmıştır.')
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setDescription(`
> **\`${prefix}pp -> .pp veya .pp @üye\`** 
> **\`${prefix}sicil -> .sicil veya .sicil @üye\`** 
> **\`${prefix}rolver -> .rolver @üye @rol\`** 
> **\`${prefix}rolal -> .rolal @üye @rol\`** 
> **\`${prefix}ban -> .ban @üye <sebep>\`** 
> **\`${prefix}kick -> .kick @üye <sebep>\`**
> **\`${prefix}uyar -> .uyar @üye <sebep>\`**
> **\`${prefix}nuke -> .nuke (kanalın silip tekrar kurur)\`**
> **\`${prefix}git -> .git @üye\`**
> **\`${prefix}gel -> .gel @üye\`**
> **\`${prefix}çek -> .çek @üye\`** 
> **\`${prefix}say -> .say\`** 
> **\`${prefix}sohbet-aç -> .sohbet-aç\`** 
> **\`${prefix}sohbet-kapat -> .sohbet-kapat\`** 
> **\`${prefix}mute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}unmute -> .unmute @üye\`** 
> **\`${prefix}smute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}sunmute -> .unmute @üye\`** 
> **\`${prefix}jail -> .jail @üye <Sebep>\`**
> **\`${prefix}unjail -> .unj @üye <Sebep>\`**
> **\`${prefix}unjail-e (Erkek İçin) -> .ue @üye\`** 
> **\`${prefix}unjail-k (Kız İçin) -> .uk @üye\`** 
> **\`${prefix}emojiekle-gif (gifli emoji ekler) -> .eegif \`**
> **\`${prefix}emojiekle-png (png emoji ekler) -> .eepng \`**
> **\`${prefix}isimdeğiştir -> .isim @üye <İsim> \`** `)
message.channel.send(extacy)

if (message.author.id !== ayarlar.sahip & message.author.id !== ayarlar.baran & message.author.id !== ayarlar.eray) return
message.channel.send(new Discord.MessageEmbed()
.setTitle(`Extacy Community Sahiplerine Özel Yardım`)           
.setFooter('Extacy Community Tarafından Yapılmıştır.')
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setDescription(`
> **\`${prefix}bot-isim -> .bot-i <İsim> (İsmimi Değiştirir)\`**
> **\`${prefix}bot-avatar -> .bot-av <URL> (Avatarımı Değiştirir) \`**
> **\`${prefix}sunucu-isim -> .sunucu-i <İsim> (Sunucu İsmini Değişir)\`**
> **\`${prefix}sunucu-resim -> .sunucu-av <URL> (Sunucu Resmini Değişir)\`**`))
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