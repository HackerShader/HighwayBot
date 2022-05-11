const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/check.js', 'module.exports = async (bot) => {\n' +
    '    let checkwall = Boolean;\n' +
    '    for (let y = 3; y >= 0; y--) {\n' +
    '        if (y !== 0) {\n' +
    '            for (let z = -2; z <= 2; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(2, y, z));\n' +
    '                if (target.name !== `air`) {\n' +
    '                    checkwall = false;\n' +
    '                }\n' +
    '            }\n' +
    '            continue;\n' +
    '        }\n' +
    '        if (y === 0) {\n' +
    '            for (let z = -1; z <= 1; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(2, y, z));\n' +
    '                if (target.name !== `air`) {\n' +
    '                    checkwall = false;\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '    return checkwall;\n' +
    '}');