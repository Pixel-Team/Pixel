const Discord = require('discord.js')
const db = require('../../Assets/db')

// Other configs

exports.run = (client, message, args) => {
  db.profile.findOne({
    _id: message.author.id
  }, (err, doc) => {

  let day = new Date().getDate()
  let month = new Date().getMonth()
  let amount = Math.floor(Math.random() * 5000) + 5000;

    if(!doc) {
      new db.profile({
          _id: message.author.id,
          coins: 0,
          daily: {
          day: 0,
          month: 0
        },
        inventory: []
      }).save()

      return message.reply('não estava registrado! (Não se preocupe, já tratei disso, pode digitar o comando novamente)')
    }

    if(doc.daily.day === day && doc.daily.month === month) {
      return message.channel.send(`<:Errado:758453158334169109> **»** ${message.author}, já pegou o seu diário hoje! Volte amanhã!`)
    } else {
      doc.coins += amount

      doc.daily.day = day

      doc.daily.month = month

      doc.save()
      
      return message.channel.send(`<:Certo:758444100411195404> **»** ${message.author}, recebeu ${amount} <:Moeda:755834418639143012> no seu diário!`)
    }
  })
}

exports.config = {
  name: 'daily',
  aliases: ['diario', 'diário']
}