const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let yetki = "823271581547102209";
let basarisiz = ayarlar.basarisizemoji;


exports.run = async(client, message) => {
if (!message.member.roles.cache.get(yetki));
      let addrole = ["823506822279200789","810645500676145232"];
      let removerole = ""
      let usize = message.mentions.users.array().length;
      let u = message.mentions.users.array();
      for(let i=0; i < usize; i++){
        let gu = message.guild.members.cache.find(r => r.id == u[i].id)
        gu.roles.add(addrole);
        gu.roles.remove(removerole);
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
    name: 'sp',
    description: '',
    usage: 'sp'
};