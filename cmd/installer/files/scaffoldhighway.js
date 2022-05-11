const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/scaffoldhighway.js', 'const Vec3 = require(\'vec3\').Vec3\n' +
    '    , log = require(\'../../console/console.js\')\n' +
    '    , edit = require(\'../../console/edit\')\n' +
    '    , mineflayer = require(\'mineflayer\')\n' +
    '    , status = require(\'../../console/status.json\')\n' +
    '\n' +
    '/**\n' +
    ' * \n' +
    ' * @param {mineflayer.Bot} bot \n' +
    ' */\n' +
    'module.exports = async (bot) => {\n' +
    '    bot.equip(87, \'hand\');\n' +
    '    for (let z = -1; z <= 1; z++) {\n' +
    '        const target = bot.blockAt(bot.entity.position.offset(2, -1, z))\n' +
    '            , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '            , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`\n' +
    '        if (target.name !== `air`) continue\n' +
    '        else {\n' +
    '            try {\n' +
    '                const airblock = bot.blockAt(target.position.offset(-1, 0, 0));\n' +
    '                log(pos, pos2, \'⛏ | Placing\', true)\n' +
    '                await bot.lookAt(new Vec3(target.position.x + 1, target.position.y, target.position.z + 0.5))\n' +
    '                await bot.placeBlock(airblock, new Vec3(1, 0, 0));\n' +
    '                log(pos, pos2, \'✅ | Done\', true)\n' +
    '                edit(\'place\', Number(status.place) + 1)\n' +
    '            } catch (error) {\n' +
    '                log(pos, pos2, \'🛑 | Error: \' + error, true)\n' +
    '                edit(\'place-err\', Number(status[\'place-err\']) + 1)\n' +
    '                edit(\'error\', status.error.push(error))\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '}')