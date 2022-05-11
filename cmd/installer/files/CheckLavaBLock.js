const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/CheckLavaBlock.js', 'module.exports = async (bot) => {\n' +
    '    let thing = {\n' +
    '        check: false,\n' +
    '    }\n' +
    '    for (let x = 1; x <= 4; x++) {\n' +
    '        for (let y = -1; y <= 4; y++) {\n' +
    '            for (let z = -3; z <= 3; z++) {\n' +
    '                const target = bot.blockAt(bot.entity.position.offset(x, y, z));\n' +
    '                if (target.name !== `lava`) continue;\n' +
    '                thing.check = true;\n' +
    '            } \n' +
    '        }\n' +
    '    }\n' +
    '    return thing;\n' +
    '}')
