const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/check/scaffoldcheck.js',
    'module.exports = (bot) => {\n' +
    '    const scaffold = {\n' +
    '        check: false,\n' +
    '    }\n' +
    '    for(let y = -1; y <= 0; y++) {\n' +
    '        for (let z = -2; z <= 2; z++) {\n' +
    '            if((z === 1 || z === -1 || z === 0) && y === 0) continue;\n' +
    '            const target = bot.blockAt(bot.entity.position.offset(2, y, z));\n' +
    '            if (target.name !== `air`) continue;\n' +
    '            scaffold.check = true;\n' +
    '        }\n' +
    '    }\n' +
    '    return scaffold.check;\n' +
    '}'
)