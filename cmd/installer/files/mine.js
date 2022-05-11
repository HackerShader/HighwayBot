const fs = require('fs');
fs.readdirSync('commands')
fs.writeFileSync('commands/mine.js', 'module.exports = {\n' +
    '    name: \'mine\',\n' +
    '    async execute(bot) {\n' +
    '        const mine = require(\'../util/HighwayTunnel/break/mine\');\n' +
    '        mine(bot)\n' +
    '    }\n' +
    '}\n' +
    '\n');
