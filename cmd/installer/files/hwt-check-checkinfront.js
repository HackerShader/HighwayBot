const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/check/checkInFront.js',
    'module.exports = (bot) => {\n' +
    '    let checkInFront = Boolean\n' +
    '    for (let y = 3; y >= 0; y--) {\n' +
    '        if (y !== 0) {\n' +
    '            for (let z = -2; z <= 2; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(1, y, z));\n' +
    '                if (target.name === `air`) continue;\n' +
    '                checkInFront = false;\n' +
    '            }\n' +
    '            continue;\n' +
    '        }\n' +
    '        if (y === 0) {\n' +
    '            for (let z = -1; z <= 1; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(1, y, z));\n' +
    '                if (target.name === `air`) continue;\n' +
    '                checkInFront = false;\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '    return checkInFront;\n' +
    '}'
)