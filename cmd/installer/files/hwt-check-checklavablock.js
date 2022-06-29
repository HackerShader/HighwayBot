const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/check/CheckLavaBlock.js',
    'module.exports = (bot) => {\n' +
    '    const thing = {\n' +
    '        check: false,\n' +
    '    }\n' +
    '    for (let x = -1; x <= 4; x++) {\n' +
    '        for (let y = -1; y <= 4; y++) {\n' +
    '            for (let z = -3; z <= 3; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(x, y, z));\n' +
    '                if (target.name !== `lava`) continue;\n' +
    '                thing.check = true;\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '    return thing;\n' +
    '}'
)