// Discord Setup

const Discord = require('discord.js')
const client = new Discord.Client()

client.login(process.env.token)
client.commands = new Discord.Collection()

// Others

const fs = require('fs')
const Canvas = require('canvas')
const prefix = 'p!'
// Database

const mongoose = require('mongoose')

mongoose.connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if(err) console.log('Database | Erro:' + err)

  console.log('Database | Online!')
});

// Express

const express = require('express');
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
  console.log('PING')
});

app.listen(process.env.PORT)

// Client

client.on('ready', () => {
  client.user.setActivity(`Prefixo: [${prefix}]`)
})

client.on('message', message => {
  if (message.author.bot) return;
  if(!message.channel.type === 'text') return;

  if(!message.content.startsWith(prefix)) return;

  const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      let command =
        args.shift().toLowerCase() || message.guild.members.cache.get(args[0]);
    
      if (
        client.commands.get(command.toLowerCase()) ||
        client.commands.some(c => c.config.aliases.includes(command.toLowerCase()))
      ) {
        if (client.commands.find(c => c.config.aliases.includes(command))) {
          command = client.commands.find(c => c.config.aliases.includes(command)).config
            .name;
        }
    
        const collectionCommand = client.commands.get(command.toLowerCase());
        collectionCommand.run(client, message, args)
      }
})

client.on('guildCreate', guild => {
  if(guild.members.size < 15) {
    guild.leave()
  }
})

// Canvas

Canvas.registerFont('Assets/Roboto.ttf', { family: 'Roboto' })

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px Roboto`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'geral');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./Assets/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#000000';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px Roboto';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Bem-vindo(a),', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

  ctx.font = applyText(canvas, 'descrição');
  ctx.fillStyle = '#ffffff';
  ctx.fillText('descrição', canvas.width / 3, canvas.height / 2)

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Bem-vindo(a) ao servidor, ${member}!`, attachment);
});

// Functions
pathCommand("./commands");
function pathCommand(path) {
  const requireAll = path =>
    fs
      .readdirSync(path)
      .map(a =>
        fs.lstatSync(path + "/" + a).isDirectory()
          ? requireAll(`${path}/${a}`)
          : require(`${path}/${a}`)
      );
  const object = Object.values(requireAll(path));
  for (var i = 0; i < object.length; i++)
    if (Array.isArray(object[i])) subPath(object[i]);
    else registerCommand(object[i]);
}

function registerCommand(command) {
  if (client.commands.get(command.config.name))
    return new Error(
      "Commands | Error: Comando já registrado:" + command.config.name
    );
  for (var i = 0; i < command.config.aliases.length; i++) {
    if (
      client.commands.some(
        c =>
          c.config.aliases.includes(command.config.aliases[i]) ||
          c.config.aliases.includes(command.config.name)
      )
    )
      return new Error("Command | Error: Comando alterantivo detetado.");
  }
  client.commands.set(command.config.name, command);
}

function subPath(array) {
  for (var i = 0; i < array.length; i++) registerCommand(array[i]);
}