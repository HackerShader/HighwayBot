const {Vec3} = require("vec3");
module.exports = async(bot) => {
    return new Promise(async(resolve) => {
        const placerequire = await require('./../check/targetblock')(bot)
        bot.equip(87)
        for (let i = 0; i < placerequire.placeblock.length; i++) {
            const airlock = bot.blockAt(placerequire.placeblock[i].position.offset(-1, 0, 0));
            try {
                await bot.placeBlock(airlock, new Vec3(1, 0, 0));
            } catch {
            }
        }
    })
}