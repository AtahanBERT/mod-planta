const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisiz;


module.exports.run = async (client, message, args) => {
  
if (!message.member.roles.cache.get(ayarlar.rewardsyetkili)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel)
    return message.reply(
      "**Bu Komutu Kullana Bilmek İçin Sesli Kanalda Olman Gerekli!**"
    );
  let odul = args.slice(0).join(" ");
  if (!odul) return message.reply("**Bir Ödül Yazman Gerek!**");

  let obj = message.member.voice.channel.members.map(mr => mr.id);
  const sonuç = obj[Math.floor(Math.random() * obj.length)];
 
  let cse = new Discord.MessageEmbed()
    .setTitle("🎉 Winner Winner")
    .setColor("GREEN")
    .setThumbnail(message.guild.iconURL)
    .setDescription(
      `**Kazanan: <@${sonuç}>\nSeslide Çekiliş Yapan: ${message.author}\nÖdül: \`${odul}\`**`
    )
    .setFooter("Planta Tarafından Yapılmıştır.")
    .setTimestamp();
  message.channel.send(cse);
};
module.exports.conf = {
  aliases: ["sesçekiliş"]
};

module.exports.help = {
  name: "ses-çekiliş"
};