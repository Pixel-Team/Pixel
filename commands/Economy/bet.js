const Discord = require('discord.js')
const db = require('../../Assets/db')

exports.run = (client, message, args) => {
  const user = message.mentions.users.first()
  let amount = args[1]

  if(!user) return;

  if(!args[1] || isNaN(amount)) return message.channel.send(`<:Errado:758453158334169109> **»** ${message.author}, precisa inserir um válido para para apostar!`) 

  amount = Number(amount)

  db.profile.findOne({
    _id: message.author.id
  }, (err, author) => {
  
  db.profile.findOne({
    _id: user.id
  }, (err, u) => {
    if(!author) return message.channel.send(`<:Aviso:758752180324401163> **»** ${message.author}, você não está no meu sistema! Tente usar o comando \`p!daily\`!`)

    if(!u) return message.channel.send(`<:Aviso:758752180324401163> **»** ${message.author}, \`${user.username}\` não está no meu sistema! Tente apostar com pessoas que usam o bot!`)

    if(author.coins < amount) return message.channel.send(`<:Aviso:758752180324401163> **»** ${message.author}, não tem <:Moeda:755834418639143012> suficientes para isso!`)

    if(u.coins < amount) return message.channel.send(`<:Aviso:758752180324401163> **»** ${message.author}, ${user.username} não tem <:Moeda:755834418639143012> suficientes para isso!`)

    message.channel.send(`${user}, ${message.author} quer apostar **${amount} <:Moeda:755834418639143012>** com você! Para aceitar, reaga <:Certo:758444100411195404> !`).then(msg => {
      msg.react('758444100411195404').then(() => {

        let filter = (reaction, User) => reaction.emoji.id === '758444100411195404' && User.id === user.id;

        const collector = msg.createReactionCollector(filter, {
          time: 60000,
          max: 1
        });

        collector.on('collect', (reaction, user) => {
          let winner = Winner(message.author.id, user.id)

          if(winner === message.author.id) {
            author.coins = author.coins + amount
            u.coins = u.coins - amount

            author.save()
            u.save()

            return message.channel.send(`<:Certo:758444100411195404> **»** ${user}, ${message.author} ganhou e recebeu **${amount} <:Moeda:755834418639143012>** !`)
          } else {
            author.coins = author.coins - amount
            u.coins = u.coins + amount

            author.save()
            u.save()

            return message.channel.send(`<:Certo:758444100411195404> **»** ${message.author}, ${user} ganhou e recebeu **${amount} <:Moeda:755834418639143012>** !`)
          }
        })
      })
    })
  })
  })
}

function Winner(user1, user2) {
  let WinnerArray = [user1.id, user2.id, user1.id, user2.id, user1.id, user2.id, user1.id, user2.id, user1.id, user2.id]

  const winner = WinnerArray[Math.floor(Math.random() * WinnerArray.length)];
  
  return winner
}

exports.config = {
  name: 'bet',
  aliases: ['apostar']
}