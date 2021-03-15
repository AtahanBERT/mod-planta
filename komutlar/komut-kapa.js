const ayarlar = require('../ayarlar.json');

let ownerid = ayarlar.sahip;
let basarisiz = ayarlar.basarisizrmoji;
let basari = ayarlar.basariliemoji;

exports.run = (client, message, args) => {
  if (message.author.id == ownerid) {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`${basarisiz} **` + args[0] + "** adında bir komut yok.");
  } else {
    message.channel.send(`${basari} **` + command + "** adlı komut devre dışı bırakılıyor...")
      .then(m => {
        client.unload(command)
          .then(() => {
            m.edit(`${basari} **` + command +  "** adlı komut başarıyla devre dışı bırakıldı.");
          })
          .catch(e => {
            m.edit(`${basarisiz} Komut kapatılırken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
} else {
return message.channel.send(`${basarisiz} Bunu yapabilmek için yeterli yetkiye sahip değilsiniz!`)
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kk'],
  permLevel: 4
};

exports.help = {
  name: 'komutkapat',
  description: 'İstediğiniz bir komutu devre dışı bırakır.',
  usage: 'komutkapat '
};

