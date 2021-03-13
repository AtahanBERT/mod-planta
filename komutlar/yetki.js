const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("**Yetersiz ❌ Yetkin Yok!**");
  if (!args.slice(0).join(" "))
    return await message.reply(
      `**❌ Hatalı Kullanım\nDoğru Kullanım: \`m!yetki yükselt/düşür @ÜYE\`**`
    );
  const member = message.mentions.members.first();

  //Lütfen Rol ID Lerini Alttan Yazmaya Başlayın
  //Ve En Düşük Yetkiden Başlayarak Gidin Yani En
  //Üstte En Düşük Yetki Gelecek Şekilde ID Leri Yazın!
  //"ROL ID" AZALTA VEYA COGALTA BILIRSINIZ
  const rolesList = [
    "812393738956701706",
    "812393578612392016",
    "812393518756134942",
    "812393501169287209",
    "812393554847465481",
    "812393604786028584",
    "812394416836575232",
    "812393697261387809",
    "812393674687905843",
    "812393650960597053",
    "812393719121575997",
    "812393840643145769",
    "817475763519488073",
    "817475873694548009",
    "812393807239839814",
    "812394003093782548",
  ];

  switch (args[0]) {
    case "yükselt":
      if (!member)
        return message.reply("**Kimin Yetkisi Yükseltilecek Yazman Gerek!**");
      const memberRoles = member.roles.cache.array();
      let givenRole = rolesList.filter(
        id => !memberRoles.some(role => role.id == id)
      );
      givenRole = givenRole.find(
        (val, i) => rolesList.length - givenRole.length - i
      );
      let gRoleInfo = await message.guild.roles.fetch(givenRole);
      if (!givenRole)
        return message.reply(
          "**Bu Üye Zaten Belirtilen En Yüksek Role Sahip!**"
        );
      await member.roles.add(givenRole);
      return await message.reply(
        `**\`${member.user.tag}\` Adlı Kullanıcıya\`${gRoleInfo.name}\` Adlı Yetkili Rolü Verildi!**`
      );
      break;
    case "düşür":
      if (!member)
        return message.reply("**Kimin Yetkisi Düşürülecek Yazman Gerek!**");
      const memberRoles2 = member.roles.cache.array();
      let takenRole = rolesList.filter(id =>
        memberRoles2.some(role => role.id == id)
      );
      takenRole = takenRole.find(
        (val, i) => i - takenRole.length - rolesList.length
      );
      let tRoleInfo = await message.guild.roles.fetch(takenRole);
      if (!takenRole)
        return message.reply(
          "**Bu Üye Zaten Belirtilen Hiç Bir Role Sahip Değil!**"
        );
      await member.roles.remove(takenRole);
      return await message.reply(
        `**\`${member.user.tag}\` Adlı Kullanıcıdan \`${tRoleInfo.name}\` Adlı Yetkili Rolü Alındı!**`
      );
      break;
  }
};
module.exports.conf = {
  aliases: []
};
module.exports.help = {
  name: "yetki"
};