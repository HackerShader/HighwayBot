const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/place/scaffoldhighway.js',
    'const Vec3 = require(\'vec3\').Vec3\n' +
    '    , log = require(\'../../console/console.js\')\n' +
    '    , edit = require(\'../../console/edit\')\n' +
    '    , status = require(\'../../console/status.json\')\n' +
    '\n' +
    'module.exports = async (bot) => {\n' +
    '    for (let y = -1; y <= 0; y++) {\n' +
    '        for (let z = -2; z <= 2; z++){\n' +
    '            if ((z === 1 || z === -1 || z === 0) && y === 0) continue;\n' +
    '            const target = bot.blockAt(bot.entity.position.offset(2, y, z))\n' +
    '                ,\n' +
    '                pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '                , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`\n' +
    '            if (target.name !== `air`) continue;\n' +
    '            const airblock = bot.blockAt(target.position.offset(-1, 0, 0));\n' +
    '            log(pos, pos2, \'⛏ | Placing\', true)\n' +
    '            try {\n' +
    '                await bot.placeBlock(airblock, new Vec3(1, 0, 0));\n' +
    '                log(pos, pos2, \'✅ | Done\', true)\n' +
    '                edit(\'place\', Number(status.place++))\n' +
    '            } catch (error) {\n' +
    '                log(pos, pos2, \'🛑 | Error: \' + error, true)\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '}\n'
)