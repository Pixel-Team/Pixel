const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {
  const messag = Date.now() - message.createdAt;
  const ping = Math.round(client.ws.ping);
  const embed = new MessageEmbed()
  .setTitle("Pong")
  .setColor("RANDOM")
  .addField("Bot", messag)
  .addField("Api", ping);
  
 // message.channel.send(client.ws.ping + 'ms')
 message.reply(embed)
}

exports.config = {
  name: 'ping',
  aliases: ['ms']
}