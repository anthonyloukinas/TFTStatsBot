const Discord = require('discord.js');
const consts = require('../utils/consts');
const api = require('../api');
const { profileHelper } = require('./profile');

const history = async (args, message, user) => {
    switch (args.length) {
        case 0: {
            await message.channel.send(`> You dont seem to have a profile linked. Try !t link`);
            break;
        }
        case 2: {
            if (!consts.regions.includes(args[0].toLowerCase())) {
                await message.channel.send(`> Region not supported! Try !t help history`);
                break;
            }
            await historyHelper(message, args[1], args[0]);
            break;
        }
        default:
            await message.channel.send('DEBUG. Hit the default profile case switch');
            break;
    }
};

module.exports = history;