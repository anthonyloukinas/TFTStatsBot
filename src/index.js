const Discord = require('discord.js');

const consts = require('./utils/consts');

const messageHandler = require('./message-handler');

const client = new Discord.Client();

const token = process.env.TOKEN;

const ours = consts.utils.ours;

client.on('ready', () => {
    console.info('TFTStatsBot is connected!');
    client.user.setActivity('!t help');
});

client.on('message', (m) => {
    if (m.author.id === client.user.id) {
        return;
    }

    if (ours(m)) {
        messageHandler.handle(m).catch((err) => {
            console.error(err);
        });
    }
});

client.login(token);