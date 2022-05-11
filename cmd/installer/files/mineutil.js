const fs = require('fs');
fs.readdirSync('util/HighwayTunnel/break')
fs.writeFileSync('util/HighwayTunnel/break/mine.js', 'let stop = Boolean\n' +
    'const Vec3 = require(\'vec3\').Vec3\n' +
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
    '    async function dig() {\n' +
    '        if (stop === true) return\n' +
    '        for (let y = 3; y >= 0; y--) {\n' +
    '            if (y !== 0) {\n' +
    '                for (let z = -2; z <= 2; z++) {\n' +
    '                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))\n' +
    '                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '                        , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`\n' +
    '                    if (target.name === \'air\') continue;\n' +
    '                    if (target && bot.canDigBlock(target)) {\n' +
    '                        try {\n' +
    '                            log(pos, pos2, \'⛏ | Digging\', true)\n' +
    '                            await bot.dig(target, false, new Vec3(-1, 0, 0))\n' +
    '                            log(pos, pos2, \'✅ | Done\', true)\n' +
    '                            edit(\'mine\', Number(status.mine) + 1)\n' +
    '                        } catch (err) {\n' +
    '                            log(pos, pos2, \'🛑 | Error: \' + err, true)\n' +
    '                            edit(\'mine-err\', Number(status[\'mine-err\']) + 1)\n' +
    '                            edit(\'error\', status.error.push(err))\n' +
    '                        }\n' +
    '                        continue;\n' +
    '                    } else {\n' +
    '                        log(pos, pos2, \'🛑 | Error: Can\\t dig block!\', true)\n' +
    '                        edit(\'mine-err\', Number(status[\'mine-err\']) + 1)\n' +
    '                        edit(\'error\', status.error.push(`${pos} | Can\'t dig!`))\n' +
    '                    }\n' +
    '                }\n' +
    '                continue;\n' +
    '            }\n' +
    '            if (y === 0) {\n' +
    '                for (let z = -1; z <= 1; z++) {\n' +
    '                    const targetdown = bot.blockAt(bot.entity.position.offset(2, y, z))\n' +
    '                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`\n' +
    '                        , pos2 = `${targetdown.position.x} ${targetdown.position.y} ${targetdown.position.z}`\n' +
    '                    if (targetdown.name === \'air\') continue;\n' +
    '                    if (targetdown && bot.canDigBlock(targetdown)) {\n' +
    '                        try {\n' +
    '                            log(pos, pos2, \'⛏ | Digging\', true)\n' +
    '                            await bot.dig(targetdown, false, new Vec3(-1, 0, 0))\n' +
    '                            log(pos, pos2, \'✅ | Done\', true)\n' +
    '                            edit(\'mine\', Number(status.mine) + 1)\n' +
    '                        } catch (err) {\n' +
    '                            log(pos, pos2, \'🛑 | Error: \' + err, true)\n' +
    '                            edit(\'mine-err\', Number(status[\'mine-err\']) + 1)\n' +
    '                            edit(\'error\', status.error.push(err))\n' +
    '                        }\n' +
    '                        continue;\n' +
    '                    } else {\n' +
    '                        log(pos, pos2, \'🛑 | Error: Can\\t dig block!\', true)\n' +
    '                        edit(\'mine-err\', Number(status[\'mine-err\']) + 1)\n' +
    '                        edit(\'error\', status.error.push(`${pos} | Can\'t dig!`))\n' +
    '                    }\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '        const checkinfront = await require(\'./checkInFront\')(bot);\n' +
    '        const scaffoldcheck = await require(\'./scaffoldcheck\')(bot);\n' +
    '        const lavacheck = await require(\'./CheckLavaBLock\')(bot);\n' +
    '        const checkwall = await require(\'./check\')(bot);\n' +
    '        if (scaffoldcheck === true) {\n' +
    '            await require(\'./scaffoldhighway\')(bot)\n' +
    '            await dig()\n' +
    '            return;\n' +
    '        }\n' +
    '        if (lavacheck.check === true) {\n' +
    '            await require(\'./placelavablock\')(bot);\n' +
    '            await dig();\n' +
    '            return;\n' +
    '        }\n' +
    '        if (checkinfront === false) {\n' +
    '            setTimeout(async () => {\n' +
    '                await dig();\n' +
    '                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));\n' +
    '            }, 500);\n' +
    '            return;\n' +
    '        }\n' +
    '        if (checkwall === false) {\n' +
    '            setTimeout(() => dig(), 500)\n' +
    '            return;\n' +
    '        }\n' +
    '\n' +
    '        setTimeout(async () => {\n' +
    '            bot.equip(278, \'hand\')\n' +
    '            await dig();\n' +
    '            bot.navigate.to(bot.entity.position.offset(1, 0, 0));\n' +
    '        }, 500);\n' +
    '    }\n' +
    '    stop = false\n' +
    '    bot.chat(\'⛏ | Bắt đầu đào\')\n' +
    '    await dig()\n' +
    '}\n' +
    '\n')
