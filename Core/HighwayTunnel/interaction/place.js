const {Vec3} = require("vec3");
module.exports = async(bot) => {
    return new Promise(async(resolve) => {
        console.log('Task: placing')
        const placerequire = await require('./../check/targetblock')(bot)
        if (placerequire.placeblock.length === 0) return require('./break')
        console.log(placerequire)
        await bot.equip(87)
        for (let i = 0; i < placerequire.placeblock.length; i++) {
            const airlock = bot.blockAt(placerequire.placeblock[i].position.offset(-1, 0, 0));
            try {
                await bot.placeBlock(airlock, new Vec3(1, 0, 0));
            } catch {
            }
        }
    })
}