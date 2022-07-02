const fs = require('fs-extra');
fs.readdirSync('Core');
fs.writeFileSync('Core/HighwayTunnel/place/placelavablock.js',
    'const Vec3 = require(\'vec3\').Vec3\n' +
    '    , log = require(\'../../console/console.js\')\n' +
    '    , edit = require(\'../../console/edit\')\n' +
    '    , status = require(\'../../console/status.json\')\n' +
    '\n' +
    'module.exports = async (bot) => {\n' +
    '    for (let x = 1; x <= 4; x++) {\n' +
    '        for (let y = -1; y <= 4; y++) {\n' +
    '            for (let z = -3; z <= 3; z++) {\n' +
    '                const block = bot.blockAt(bot.entity.position.offset(x, y, z))\n' +
    '                    , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '                    , pos2 = `${block.position.x} ${block.position.y} ${block.position.z}`\n' +
    '                if (block.name !== `lava`) continue;\n' +
    '                else {\n' +
    '                    try {\n' +
    '                        const lavablock = bot.blockAt(block.position.offset(-1, 0, 0))\n' +
    '                        log(pos, pos2, \'⛏ | Placing\', true)\n' +
    '                        bot.lookAt(new Vec3(block.position.x - 1, block.position.y, block.position.z + 0.5))\n' +
    '                        await bot.placeBlock(lavablock, new Vec3(1, 0, 0));\n' +
    '                        log(pos, pos2, \'✅ | Done\', true)\n' +
    '                        edit(\'place\', Number(status.place++))\n' +
    '                    } catch (error) {\n' +
    '                        log(pos, pos2, \'🛑 | Error: \' + error, true)\n' +
    '                    }\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '}\n'
);