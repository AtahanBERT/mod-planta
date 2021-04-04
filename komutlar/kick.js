 
                if (!muteler.some(j => j.id == kullanici.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
                    data.add('case', 1)
                    const numara = await data.fetch('case')
                      moment.locale("tr");
                  kdb.push(`kullanici.${kullanici.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: sebep,
                    Ceza: "KICK",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };    
message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author} tarafından ${kullanici} \`${sebep}\` Sebebiyle Sunucudan Atıldı.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()) 
kicklog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sunucudan Atıldı !**\n**Kickleyen Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**Kicklenen Üye:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `));
}

exports.conf = {
    aliases: ['kickle'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kick'
  };