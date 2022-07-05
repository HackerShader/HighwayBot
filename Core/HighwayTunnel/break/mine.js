let stop = Boolean;
const Vec3 = require('vec3').Vec3;
const config = require(`../../../config/${require('../../../path.json').config}`);
const log = require('../../Console/log');
const { Bot } = require('mineflayer');

/**
 * Dig command
 * @param {Bot} bot Mineflayer bot
 */
module.exports = async (bot) => {
    async function dig() {
        if (stop === true) return;
        for (let x = -3; x <= 2; x++) {
            for (let y = 3; y >= 0; y--) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(x, y, z)),
                        pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`
                        , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`;
                    if (target.name === 'air' || !bot.canDigBlock(target) || !target) continue;
                    if ((z === -2 || z === 2) && y === 0 && target) continue;
                    log(target.name, pos2, 'dig', true);
                    await bot.dig(target, true, new Vec3(-1, 0, 0));
                    //await bot.swingArm('right', true)
                    log(target.name, pos2, 'done', true);
                }
            }
        }
        await require('../inventory/cleaner')(bot);
        const checkinfront = await require('../check/checkInFront')(bot);
        const scaffoldcheck = require('../check/scaffoldcheck')(bot);
        const lavacheck = require('../check/CheckLavaBLock')(bot);
        if (scaffoldcheck === true || lavacheck.check === true) {
            await require('../inventory/equip-block')(bot);
            await require('../place/scaffoldhighway')(bot);
            await require('../place/placelavablock')(bot);
            await dig();
            return;
        }
        if (checkinfront === false) {
            setTimeout(async () => {
                await dig();
                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));
            }, 600);
            return;
        }
        setTimeout(async () => {
            await require('../inventory/itemsaver')(bot);
            await dig();
            bot.navigate.to(bot.entity.position.offset(1, 0, 0));
        }, 600);
    }

    stop = false;
    //bot.chat(`/msg ${config.username} | Starting Dig`);
    await dig();
};