
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
let talkedRecently = new Set();
let basarisiz = ayarlar.basarisizemoji;
module.exports = async message => {
  
  
  
 /* if(cmd) kısmının üzerine bunu yazıyorsunuz */
  if(cmd && cmd.help.name !== 'bakım-modu') {
  const neblmölçmedimikamk = await require('quick.db').fetch(client.user.id);
  if(neblmölçmedimikamk == true) {
  var DURATION = require('humanize-duration');
  const chimped = await db.fetch(client.user.id+':)');
  var TIMESTAMP = Date.now() - chimped.time;
  var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
  message.react('❌');
  return message.reply(`${basarisiz} ***${client.user.username}*** şu anda bakımda.\nYaklaşık ***${RESULT} önce*** bakıma alınmış.\nBakıma alan: ***${chimped.author.tag}***`);
  };
  };
  
  
  
  
const ms = require('parse-ms');
  let client = message.client;

  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    let zamans = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = ms(Date.now() - zamans);

     var REASON = await db.fetch(`afk_${message.author.id}`);

    message.member.setNickname(message.member.nickname.slice(("[AFK] ").length))
    let zamant = await db.fetch(`afk_süre_${message.author.id}`);
    let sa = ms(Date.now() - zamant);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    const muah2  = new Discord.MessageEmbed()
    .setDescription(`${message.author.tag} adlı kullanıcı artık AFK değil`)
    .setColor("#00ff88")
    message.channel.send(muah2)

  
  }
  
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 0);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};


