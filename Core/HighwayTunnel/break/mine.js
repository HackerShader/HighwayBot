const Vec3 = require('vec3').Vec3;
const log = require('../../Console/log');
const editJsonFile = require('edit-json-file');
const file = require('../../../data/status.json');

module.exports = async (bot) => {
    async function dig() {
        let sum = 0;
        let blockcount = await require('../check/minecalc')(bot);

        delete require.cache[require.resolve('../../../data/status.json')];
        if (require('../../../data/status.json').stop === true) return;
        await require('../inventory/itemsaver')(bot);

        for (let x = -3; x <= 2; x++) {
            for (let y = 3; y >= 0; y--) {
                for (let z = -2; z <= 2; z++) {
                    // checking target block
                    const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                        , pos = `${target.position.x} ${target.position.y} ${target.position.z}`;
                    if (target.name === 'air' || !bot.canDigBlock(target) || !target) continue;
                    if ((z === -2 || z === 2) && y === 0 && target) continue;

                    //Progress_dig
                    let Progress_dig = sum++;
                    const Blockpercentage = Number(100 / Number(blockcount));

                    //timer between each block
                    const date = new Date();
                    const time = date.getTime();
                    delete require.cache[require.resolve('../../../data/status.json')];
                    const refresh_file = require('../../../data/status.json');

                    //digging and logging
                    log(target.name, pos, 'dig', true, `[${Number(Progress_dig * Blockpercentage).toFixed(3)}%] [${refresh_file.timer}ms]`);
                    await bot.dig(target, false, new Vec3(-1, 0, 0));

                    //calculating time after digging each block
                    const done_date = new Date();
                    const done_time = done_date.getTime();
                    let time_diff = Number(done_time - time);

                    //After_dig and saving
                    const data = editJsonFile('data/status.json');
                    data.set('mine', Number(file.mine++).toString());
                    data.set('timer', Number(time_diff).toString());
                    data.save();
                    log(target.name, pos, 'done', true, `[100%] [${time_diff}ms]`);
                }
            }
        }

        //handler
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
            await dig();
            bot.navigate.to(bot.entity.position.offset(1, 0, 0));
        }, 600);
    }

    await dig();
};