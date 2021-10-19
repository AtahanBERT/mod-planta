const Discord = require('discord.js');
const database = require('quick.db');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {
if(message.author.id !== ayarlar.sahip) return;

function gönderkardesim(content) {
const infoEmbed = new Discord.MessageEmbed()
.setColor('0x348f36')
.setDescription(content)
.setTimestamp()
.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }));
return message.channel.send(infoEmbed)
};

const durum = await database.fetch(client.user.id);
if(durum == true) {

await database.delete(client.user.id);
return gönderkardesim(`${basari} Bakım artık sona erdi.`);

} else {

await database.set(client.user.id, true);
database.set(client.user.id+'sa', { 
author: message.author,
time: Date.now() 
});

return gönderkardesim(`${basari} Bakım modu açıldı.\nArtık hiç bir kimse komutları kullanamayacak.`);
};


}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakım'],
  permLevel: 0
};
 
exports.help = {
  name: 'bakım-modu'
};