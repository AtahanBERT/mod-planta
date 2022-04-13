const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const ayarlar = require("../ayarlar.json");
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
 
if (!message.member.roles.cache.get(ayarlar.mod) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

  const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.uyarılog)//Ban log kanalı  
  
 let uyarı1 = ayarlar.uyarı1;
 let uyarı2 = ayarlar.uyarı2;
 let uyarı3 = ayarlar.uyarı3;
 let kullanıcı = message.mentions.users.first()
 let uyarisayisi = db.fetch(`uyari.${message.guild.id}_${kullanıcı.id}`);
 let sunucu = message.guild;
 let uyarilcak = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
 let sebep = args.slice(1).join(" ");

if(kullanıcı.bot)
  return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Botları uyaramazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

  
if(!uyarilcak)
  return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

if(!sebep)
  return message.channel.send(new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

 message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, ${uyarilcak} Adlı kişiyi başarıyla uyardım, özel mesajlarında uyarısı gözükücektir.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());
 let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == uyarilcak.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
db.add('case', 1)
                    const numara = await db.fetch('case')
                      moment.locale("tr");
                  kdb.push(`kullanici.${uyarilcak.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: sebep,
                    Ceza: "UYARI",
                    Süre: "Sınırsız",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };
 return uyarilcak.send(new MessageEmbed().setDescription(`${sunucu}, Sunucusunda \`${sebep}\` Sebebiyle Uyarıldın!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('BLACK').setTimestamp())+
 db.add(`uyari.${kullanıcı.id}`, 1)
 message.react('✅');
 
if (uyarisayisi === null) {
uyarilcak.roles.add(uyarı1)
}
  
if (uyarisayisi === 1) {
uyarilcak.roles.add(uyarı2)
}
  
if (uyarisayisi === 2) {
uyarilcak.roles.add(uyarı3)
}
  
if (uyarisayisi === 3) {
uyarilcak.roles.cache.forEach(r => {
uyarilcak.roles.remove(r.id);
uyarilcak.roles.add(ayarlar.cezalı)
db.delete(`uyari.${kullanıcı.id}`)
message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, ${uyarilcak} Adlı kişi \`3\` kez uyarıldığı için başarıyla jaile attım.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp());
})}
banlog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Uyarıldı!**\n**Uyaran Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Uyarılan Üye:** ${kullanıcı.user.tag} (\`${kullanıcı.user.id}\`)\n**Sebep:** \`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `))
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarı","uyarıver","uyari"],
  permlevel: 0
};

exports.help = {
  name: "uyar",
  description: "Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.",
  usage: "uyarı"
};