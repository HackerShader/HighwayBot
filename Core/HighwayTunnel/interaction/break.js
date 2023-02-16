const { Vec3 } = require("vec3");
module.exports = async (bot) => {
    return new Promise(async (resolve) => {
        console.log('[Tasks] Mining')
        const breakrequire = await require('./../check/targetblock')(bot)
        if (breakrequire.breakblock.length === 0) return await require('./../check/targetblock')
        console.log(breakrequire)
        for (let i = 0; i < breakrequire.breakblock.length; i++) {
            await bot.dig(breakrequire.breakblock[i], true, new Vec3(-1, 0, 0));
        }
    })
}


