const Discord = require('discord.js')
const db = require('../../Assets/db')

exports.run = (client, message, args) => {
  const user = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username == args[0]) || message.author

  db.profile.findOne({
    _id: user.id
  }, (err, doc) => {
    if(!doc) {
      return message.reply('não encontrei esse usuário na minha lista!')
    }
      if(!message.guild.me.hasPermission("EMBED_LINKS") && user.id === message.author.id) {
        return message.channel.send(`<:Info:756231486872616988> **»** ${message.author}, neste momento possui ${doc.coins} <:Moeda:755834418639143012>!`)
      }

      if(!message.guild.me.hasPermission('EMBED_LINKS') && user.id !== message.author.id) {
        return message.channel.send(`<:Info:756231486872616988> **»** ${message.author}, neste momento \`${user.tag}\` possui ${doc.coins} <:Moeda:755834418639143012>!`)
      }

      if(message.guild.me.hasPermission('EMBED_LINKS') && user.id === message.author.id) {
        return message.channel.send(message.author, {
          embed: {
            'title': '<:Moeda:755834418639143012> **» Banco**',
            'fields': [
              {
                name: `${user.username}:`,
                value: `${doc.coins} <:Moeda:755834418639143012>`
              }
            ],
            'footer': {
              'icon_url': client.user.avatarURL(),
              'text': client.user.username
            }
          }
        })
      }

      if(message.guild.me.hasPermission('EMBED_LINKS') && user.id !== message.author.id) {
        return message.channel.send(message.author, {
          embed: {
            'title': '<:Moeda:755834418639143012> **» Banco**',
            'fields': [
              {
                name: `${user.username}:`,
                value: `${doc.coins} <:Moeda:755834418639143012>`
              }
            ],
            'footer': {
              'icon_url': client.user.avatarURL(),
              'text': client.user.username
            }
          }
        })
      }
  })
}

exports.config = {
  name: 'balance',
  aliases: ['bal']
}