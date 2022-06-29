const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/console/console.js',
    'module.exports = (botPos, blockPos, status, clear) => {\n' +
    '    const info = require(\'./status.json\')\n' +
    '    if (clear) console.clear()\n' +
    '    console.log(`[HighwayBot]\\n> Current: ${botPos}.\\n> Progress: ${blockPos}.\\nTotal block dug: ${info.mine}\\nTotal block placed: ${info.place}\\nStatus: ${status}`)\n' +
    '}'
)