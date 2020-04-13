const consts = require('../utils/consts');

const helpMessage = '!t help \n Returns list of available TFT Stats Bot commands';

/**
 * !t help
 * @param {*} args 
 * @param {*} channel 
 */
const help = async (args, channel) => {
    channel.send(helpMessage);
};

module.exports = help;
// module.exports.getHelpMessage = getHelpMessage;