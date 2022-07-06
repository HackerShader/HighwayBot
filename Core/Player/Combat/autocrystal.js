//j4f
const Vec3 = require('vec3').Vec3;

module.exports = async (bot) => {
    bot.equip(426, 'hand')
    setInterval(async () => {
        bot.nearestEntity(async (entity) => {
            const blockPos = entity.position.floored().offset(1, -1, 0)
            try {
                await bot.attack(entity, true)
                if(entity.name !== 'ender_crystal') {
                    setTimeout(async () => {
                        await bot.placeEntity(bot.blockAt(blockPos), new Vec3(0, 1, 0))
                    }, 100)
                } else return;

            } catch {
            }
        })
    }, 50);
}

