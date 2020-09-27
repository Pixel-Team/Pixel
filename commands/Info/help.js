const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle('<:Comando:758412374075637801> **» Comandos**')
  .addFields(
    {
      name: '<:Moeda:755834418639143012> • Economia',
      value: '`daily` - Pegar o seu diário\n`balance <@usuário>` - Ver as suas moedas\n`leaderboard` - Ver o ranking de moedas\n`apostar [@usuário] [valor]` - Apostar <:Moeda:755834418639143012> contra um usuário',
      inline: true
    }
  )
  .setColor('GREEN')
  .setFooter(`Pixel | Parâmetros: [] - obrigatório, <> - Opcional`, client.user.avatarURL())

  message.channel.send(embed)
}

exports.config = {
  name: 'help',
  aliases: ['ajuda']
}