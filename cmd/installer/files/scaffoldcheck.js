const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/scaffoldcheck.js', 'module.exports = async (bot) => {\n' +
    '    let scaffold = {\n' +
    '        check: false,\n' +
    '    }\n' +
    '    for (let z = -1; z <= 1; z++) {\n' +
    '        const target = bot.blockAt(bot.entity.position.offset(2, -1, z));\n' +
    '        if (target.name !== `air`) continue;\n' +
    '        scaffold.check = true;\n' +
    '    }\n' +
    '    return scaffold.check;\n' +
    '}')