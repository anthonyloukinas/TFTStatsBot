const Discord = require('discord.js');
const consts = require('../utils/consts');
const api = require('../api');

const profile = async (args, message, user) => {
    switch (args.length) {
        case 0: {
            message.channel.send(`> You don't seem to have a profile linked. Try !t link`);
            break;
        }
        case 2:
            if (!consts.regions.includes(args[0].toLowerCase())) {
                await message.channel.send('> Region not supported! Try !t help profile');
                break;
            }
            await profileHelper(message, args[1], args[0]);
            break;
        default:
            await message.channel.send('DEBUG. Hit the default profile case switch');
            break;
    }
};

const profileHelper = async (message, username, region) => {
    console.info(`profileHelper ${username} ${region}`);

    message.react('668266631482572800');

    let res;
    try {
        res = await api.getProfile(username, region);
    } catch (err) {
        console.error(`${err.name} ${err.message}`);
        await message.channel.send(`Couldn't find user ${username} in region ${region}`);
        return;
    };

    let res2;
    try {
        res2 = await api.getSessions(username, region);
    } catch (e) {
        console.error(`${e.name} ${e.message}`);
        message.channel.send(`Couldn't find \`sessions\` for user ${username} in region ${region}`); 
        return;
    };

    const user = reqToObj(res.data.segments[0].stats, ['wins', 'losses', 'rank', 'tier', 'leaguePoints']);

    // set some after data
    user.platformInfo = res.data.platformInfo;
    user.lastMatch = res2.data.items[0].matches[0];
    user.lastMatchComp = "";
    user.lastMatchUnitComp = "";

    for (t of user.lastMatch.traits) {
        console.log(JSON.stringify(t));
        if (t.tierCurrent != 0) {
            if (t.name.includes('_')) {
                user.lastMatchComp += `${t.tierCurrent}x **${t.name.split('_')[1]}**  `;
            } else {
                user.lastMatchComp += `${t.tierCurrent}x **${t.name}**  `;
            }
        }
    };

    for (u of user.lastMatch.units) {
        user.lastMatchUnitComp += `Lv. **${u.tier}** *${u.name}*  `;
    };

    /**
     * Remove Reactions from requesters message
     */
    message.reactions.removeAll().catch(e => console.error(e));

    await sendImage(username, user, message.channel);
};

const sendImage = async (username, user, channel) => {

    const embedMsg = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`TFT Player Statistics`)
        .setThumbnail(user.platformInfo.avatarUrl)
        .setAuthor(`TFT Profile: ${username} (NA)`, user.platformInfo.avatarUrl)
        .addFields(
            { name: 'Division', value: `${user.tier.displayValue}`, inline: true },
            { name: 'League Points', value: `${user.leaguePoints.displayValue}LP`, inline: true },
            { name: 'Win(s)', value: `${user.wins.displayValue}` },
            { name: 'Loss(es)', value: `${user.losses.displayValue}`, inline: true },
            { name: 'Ratio', value: `${(user.wins.value / (user.losses.value + user.wins.value) * 100).toFixed(1)}%` },
            { name: 'Last Match', value: `${user.lastMatch.metadata.result.displayValue} place - *${user.lastMatch.metadata.timeEliminated.displayValue}*` },
            { name: 'Comp', value: `${user.lastMatchComp}` },
            { name: 'Units', value: `${user.lastMatchUnitComp}` }
        )
        .setTimestamp()
        .setFooter('Author: @antonio#7974');

    await channel.send(embedMsg);
};

const reqToObj = (req, args) => {
    let obj = {};
    args.forEach((arg) => {
        obj[arg] = req[arg];
    });
    return obj;
};

module.exports = profile;