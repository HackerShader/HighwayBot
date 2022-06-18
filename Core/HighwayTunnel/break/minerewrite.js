const { Vec3 } = require("vec3");
module.exports = async (bot) => {
    /* let promise = */ async function promise() /*new Promise(async (resolve, reject)  => */ {
        for (let x = -3; x <= 3; x++) {
            for (let y = 3; y >= 0; y--) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                    if (target.name === 'air' || !bot.canDigBlock(target) || !target) continue;
                    if ((z === -2 || z === 2) && y === 0 && target) continue;
                    console.log('Digging at ', target.position.x, target.position.y, target.position.z, target.name)
                    await bot.dig(target, false, new Vec3(-1, 0, 0));
                }
            }
        }
    } // )


    //do mine then require check.js
    await bot.navigate.to(bot.entity.position.offset(2, 0, 0));
    promise().then(() => {
        require('../check/check')(bot)
    })
}