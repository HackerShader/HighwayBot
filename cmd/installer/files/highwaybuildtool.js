const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/highwaybuildtool.js',
    'module.exports = async (bot) => {\n' +
    '    await require(\'./break/mine\')(bot)\n' +
    '}'
)