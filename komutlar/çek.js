const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {
  let basarisiz = ayarlar.basarisizemoji
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} Ses odana çekilecek üyeyi belirtmelisin!`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(new Discord.MessageEmbed().setDescription((`${basarisiz} Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!`)).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  if (message.member.hasPermission("ADMINISTRATOR")) {await uye.voice.setChannel(message.member.voice.channelID);} else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: new Discord.MessageEmbed().setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        let cevap = c.first();
	if (cevap) {
	  uye.voice.setChannel(message.member.voice.channelID);
          msj.delete();
	};
      });
    });
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'çek',
  description: "Etiketlenen kişiyi yanınıza çeker",
  usage: '.çek @etiket'
}