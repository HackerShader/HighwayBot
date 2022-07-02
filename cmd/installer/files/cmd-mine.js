const fs = require('fs-extra');
fs.readdirSync('commands');
fs.writeFileSync('commands/mine.js',
    'module.exports = {\n' +
    '    name: \'mine\',\n' +
    '    async execute(bot) {\n' +
    '        await require(\'./../Core/HighwayTunnel/highwaybuildtool\')(bot);\n' +
    '    }\n' +
    '}\n'
);