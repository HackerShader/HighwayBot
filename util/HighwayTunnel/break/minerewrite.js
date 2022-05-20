const {Vec3} = require("vec3");
module.exports = async (bot) => {
    async function dig() {
        for (let x = -3 ; x <= 3; x++) {
            for (let y = 3; y >= 0; y--) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                    if(target.name === 'air' || !bot.canDigBlock(target) || !target) continue;
                    if((z === -2 || z === 2) && y === 0 && target.name === 'netherrack') continue;
                    await bot.dig(target, false, new Vec3(-1, 0, 0))
                    console.log(target.position.x, target.position.y, target.position.z, target.name)
                }
            }
        }
    }
    const checkinfront = await require('./checkInFront')(bot);
    const scaffoldcheck = await require('./scaffoldcheck')(bot);
    const lavacheck = await require('./CheckLavaBLock')(bot);
    const checkwall = await require('./check')(bot);
    if (scaffoldcheck === true) {
        await require('./scaffoldhighway')(bot)
        await dig()
        return;
    }
    if (lavacheck.check === true) {
        await require('./placelavablock')(bot);
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
        bot.equip(278, 'hand')
        await dig();
        bot.navigate.to(bot.entity.position.offset(2, 0, 0));
    }, 500);
}