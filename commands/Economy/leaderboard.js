const Discord = require('discord.js')
const db = require('../../Assets/db')

exports.run = (client, message, args) => {
      db.profile.find({}).sort([['coins', 'descending']]).exec(async (err, doc) => {
      let embed = new Discord.MessageEmbed()
      .setTitle("RANKING")
      .setColor("#7fff6e")

      if(doc.length === 0) {
        embed.setDescription(`Sem informações!`)
      }
        let limit = doc.length

        if(limit > 10) limit = 10


        for(i = 0; i < limit; i++) {
          let user = client.users.cache.get(doc[i]._id)
          let name = 'Desconhecido'
          if(user) name = user.tag

          let tag = i + 1

          if(tag === 1) {
            tag = "🥇"
          } else if (tag === 2) {
            tag = "🥈"
          } else if(tag === 3) {
            tag = "🥉"
          } else {
            tag = "🎖️"
          }

          embed.addField(`${tag} | \`${name}\``, `${doc[i].coins} <:Moeda:755834418639143012>`)
      }

      message.channel.send(embed)
    })
}

exports.config = {
  name : 'leaderboard',
  aliases: ['top', 'ranking']
}