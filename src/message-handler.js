const consts = require('./utils/consts');
const handlers = require('./handlers/index');

const handle = async (m) => {
    console.info(`Received message [${m.id}]: '${m.author.tag}: ${m.content}'`);

    const args = m.content.split(' ');

    if (args.length < 2) {
        console.info(`Message [${msg.id}] without any args`);
        await handlers.lost(m.channel);
        return;
    };

    const args2 = args.slice(2, args.length); // Removes !t <command>
    let args3 = []; //for profile and link profile
    
    if (args2[0]) { 
        args3.push(args2[0]); 
    }

    if (args2.length > 1) { 
        args3.push(args2.slice(1, args.length).join(' '));
    }

    switch (args[1]) {
        case consts.prefixes.help:
            await handlers.help("", m.channel);
            break;
        case consts.prefixes.profile:
            await handlers.profile(args3, m, m.author);
            break;
        case consts.prefixes.history:
            await handlers.history();
            break;
    }
};

exports.handle = handle;