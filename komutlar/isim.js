const discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

 


exports.run = async (client, message, args) => {
  
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let tag = ayarlar.tag;
    let yetkili = ayarlar.kayıtyetkili;
    let kayıtsız = ayarlar.kayıtsız;
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`);
    let erkekkayıt = db.fetch(`erkekkayıtsayı_${message.author.id}`);
    let genelsohbet1 = ayarlar.genelsohbet;
    let kayıtsohbet2 = ayarlar.kayıtsohbet;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yaş = args[2];
  
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Bot kullanımı şuanda kapalıdır. Lütfen sonra tekrar deneyiniz!`))}
}
  
  
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
  if (!member) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} İsmini değiştireceğin kullanıcıyı belirtmelisin!`));
  if (!isim) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Bir isim belirtmelisin! `));
  if (!yaş) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Bir yaş belirtmelisin! `));
  if(yaş < 15) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Kullanıcısının Yaşı **15**'den küçük olduğu için kayıt edemiyorum.`)).then(message => message.delete({timeout: 4000}));
  if (!ayarlar.sahip) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${basarisiz} Sahibimin üzerinde komut kullanamazsın!`));
 
  var number = 1;
let stat = db.get(`isim.${message.guild.id}`);


let isimler = stat.filter(x => x.user === member.id).map(x => `\`${number++}.\` \` ${x.name} | ${x.age}\``).join("\n")


  
if(member.user.username.includes(tag)) {
    

member.setNickname(`${tag} ${isim} ${yaş}`);
message.channel.send(new discord.MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({dynamic: true})).setDescription(`${basarili} Başarılı bir şekilde ${member} kullanıcının ismini \`${tag} ${isim} ${yaş}\` şeklinde değiştirdim.`).setColor('GREEN')).then(message => message.delete({timeout: 4000}));
}
else{
member.setNickname(`${tag} ${isim} ${yaş}`);
  
  
message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`${basarili} Başarılı bir şekilde ${member} kullanıcının ismini  \`${tag} ${isim} ${yaş}\` şeklinde değiştirdim.`)).then(message => message.delete({timeout: 4000}));
  

  const embed = new discord.MessageEmbed().setColor('GREEN').setDescription(`Önceki isimleri\n${isimler}`)
message.channel.send(embed).then(message => message.delete({timeout: 4000}));;
  
  db.push(`isim.${message.guild.id}`, 
{user: member.id,  name: isim, age: yaş});
  

};
message.react(basarili)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""],
    permLevel: 0
};

exports.help = {
    name: ""
}