const Discord = require('discord.js')

exports.run = (client, message, args) => {
  let invite = 'https://discord.com/oauth2/authorize?client_id=' + client.user.id + '&permissions=2146958847&scope=bot'

  message.channel.send(invite)
}

exports.config = {
  name: 'invite',
  aliases: ['convidar', 'convite']
}