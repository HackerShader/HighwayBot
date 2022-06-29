const fs = require('fs-extra');
fs.readdirSync('Core')
fs.writeFileSync('Core/HighwayTunnel/break/mine.js',
    'let stop = Boolean\n' +
    'const Vec3 = require(\'vec3\').Vec3\n' +
    '    , log = require(\'../../console/console.js\')\n' +
    '    , edit = require(\'../../console/edit\')\n' +
    '    , status = require(\'../../console/status.json\')\n' +
    'const config = require(\'./../../../config.json\')\n' +
    '\n' +
    'module.exports = async (bot) => {\n' +
    '    async function dig() {\n' +
    '        await require(\'../inventory/itemsaver\')(bot);\n' +
    '        if (stop === true) return\n' +
    '        for (let x = -3; x <= 2; x++) {\n' +
    '            for (let y = 3; y >= 0; y--) {\n' +
    '                for (let z = -2; z <= 2; z++) {\n' +
    '                    const target = bot.blockAt(bot.entity.position.offset(x, y, z))\n' +
    '                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '                        , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`\n' +
    '                    if (target.name === \'air\' || !bot.canDigBlock(target) || !target) continue;\n' +
    '                    if ((z === -2 || z === 2) && y === 0 && target) continue;\n' +
    '                    log(pos, pos2, \'⛏ | Digging\', true)\n' +
    '\n' +
    '                    await bot.dig(target, true, new Vec3(-1, 0, 0))\n' +
    '\n' +
    '                    //await bot.swingArm(\'right\', true)\n' +
    '                    log(pos, pos2, \'✅ | Done\', true)\n' +
    '                    edit(\'mine\', Number(status.mine++))\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '        const checkinfront = await require(\'../check/checkInFront\')(bot);\n' +
    '        const scaffoldcheck = require(\'../check/scaffoldcheck\')(bot);\n' +
    '        const lavacheck = require(\'../check/CheckLavaBLock\')(bot);\n' +
    '        if (scaffoldcheck === true || lavacheck.check === true) {\n' +
    '            bot.equip(87, \'hand\');\n' +
    '            await require(\'../place/scaffoldhighway\')(bot);\n' +
    '            await require(\'../place/placelavablock\')(bot);\n' +
    '            await dig();\n' +
    '            return;\n' +
    '        }\n' +
    '        if (checkinfront === false) {\n' +
    '            setTimeout(async () => {\n' +
    '                await dig();\n' +
    '                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));\n' +
    '            }, 800);\n' +
    '            return;\n' +
    '        }\n' +
    '        setTimeout(async () => {\n' +
    '            await dig();\n' +
    '            bot.navigate.to(bot.entity.position.offset(1, 0, 0));\n' +
    '        }, 800);\n' +
    '    }\n' +
    '    stop = false\n' +
    '    bot.chat(`/msg ${config.username} | Starting Dig`)\n' +
    '    await dig()\n' +
    '}'
)