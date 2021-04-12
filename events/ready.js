const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = client => {
  client.user.setStatus("online");
  
  let durum = ayarlar.durum
client.user.setActivity(durum, {type: 'PLAYING'}); 

}