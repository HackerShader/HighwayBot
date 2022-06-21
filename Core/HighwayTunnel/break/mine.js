let stop = Boolean
const Vec3 = require('vec3').Vec3
    , log = require('../../console/console.js')
    , edit = require('../../console/edit')
    , status = require('../../console/status.json')


module.exports = async (bot) => {
    async function dig() {
        if (stop === true) return
        for (let x = -3; x <= 2; x++) {
            for (let y = 3; y >= 0; y--) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`
                        , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`
                    if (target.name === 'air' || !bot.canDigBlock(target) || !target) continue;
                    if ((z === -2 || z === 2) && y === 0 && target) continue;
                    log(pos, pos2, '⛏ | Digging', true)
                    await bot.dig(target, false, new Vec3(-1, 0, 0))
                    log(pos, pos2, '✅ | Done', true)
                    edit('mine', Number(status.mine) + 1)
                }
            }
        }
        const checkinfront = await require('../check/checkInFront')(bot);
        const scaffoldcheck = await require('../check/scaffoldcheck')(bot);
        const lavacheck = await require('../check/CheckLavaBLock')(bot);
        const checkwall = await require('../check/check')(bot);
        if (scaffoldcheck === true) {
            await require('../place/scaffoldhighway')(bot)
            await dig()
            return;
        }
        if (lavacheck.check === true) {
            await require('../place/placelavablock')(bot);
            await dig();
            return;
        }
        if (checkinfront === false) {
            setTimeout(async () => {
                await dig();
                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));
            }, 500);
            return;
        }
        if (checkwall === false) {
            setTimeout(() => dig(), 500)
            return;
        }

        setTimeout(async () => {
            await require('../inventory/itemsaver')(bot);
            await dig();
            bot.navigate.to(bot.entity.position.offset(1, 0, 0));
        }, 500);
    }
    stop = false
    bot.chat('⛏ | Bắt đầu đào')
    await dig()
}


