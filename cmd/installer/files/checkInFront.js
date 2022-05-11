const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/checkInFront.js', 'module.exports = async (bot) => {\n' +
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
    '}');