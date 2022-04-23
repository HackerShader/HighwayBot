const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log('Discord client was ready');
})

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix + 'reload') && !(msg.author.id == `485419430885457930` || msg.author.id == `920711890211053579`)) {
        msg.channel.send('Admin Only (fuck lbt)');
        return;
    }
    delete require.cache[require.resolve(`./index.js`)];
    const cmd = require(`./index.js`);
    client.commands.set(cmd.name, cmd);
    msg.channel.send('bot restarting...');
});
client.login(config.token);