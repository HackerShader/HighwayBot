const {Vec3} = require("vec3");
module.exports = async(bot) => {
    const breakrequire = await require('./../check/targetblock')(bot)
    for (let i = 0; i < breakrequire.breakblock.length; i++) {
        await bot.dig(breakrequire.breakblock[i], true, new Vec3(-1, 0, 0));
    }
}
