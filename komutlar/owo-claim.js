const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let yetki = ayarlar.rewardsyetkili;
let basarisiz = ayarlar.basarisizemoji;


exports.run = async(client, message) => {
if (!message.member.roles.cache.get(yetki)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
      let addrole = "823592578867920906";
      let usize = message.mentions.users.array().length;
      let u = message.mentions.users.array();
      for(let i=0; i < usize; i++){
        let gu = message.guild.members.cache.find(r => r.id == u[i].id)
        gu.roles.add(addrole);
        message.react('✅');
      }
      //console.log(usize + " USERS\n" + u)
              
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'wcl',
    description: '',
    usage: 'wcl'
};