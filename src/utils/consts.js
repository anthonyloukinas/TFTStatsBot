const prefix = "!t";

const regions = ['euw', 'na', 'eune', 'oce', 'tr', 'br', 'lan', 'las', 'ru', 'jp'];

const prefixes = {
    help: 'help',
    profile: 'profile',
    history: 'history'
};

const ours = (msg) => {
    let msgPrefix = msg.content.split(' ')[0].toLowerCase();
    return msgPrefix === prefix;
};

const utils = {
    ours
};

module.exports = {
    prefix,
    regions,
    utils,
    prefixes
};