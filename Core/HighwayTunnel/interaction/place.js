const {Vec3} = require("vec3");
module.exports = async(bot) => {
        console.log('Task: placing')
        const placerequire = await require('./../check/targetblock')(bot)
        console.log(placerequire)
        await bot.equip(87)
        for (let i = 0; i < placerequire.placeblock.length; i++) {
            const airlock = bot.blockAt(placerequire.placeblock[i].position.offset(-1, 0, 0));
            try {
                await bot.placeBlock(airlock, new Vec3(1, 0, 0));
            } catch {
            }
        }

}