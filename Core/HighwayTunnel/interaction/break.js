const { Vec3 } = require("vec3");
module.exports = async (bot) => {
    console.log('[Tasks] Mining')
    const breakrequire = await require('./../check/targetblock')(bot)
    console.log(breakrequire)
    for (let i = 0; i < breakrequire.breakblock.length; i++) {
        await bot.dig(breakrequire.breakblock[i], true, new Vec3(-1, 0, 0));
    }
}
