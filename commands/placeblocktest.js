const Vec3 = require('vec3').Vec3;
module.exports = {
    name: 'placeblocktest',
    async execute(bot, message, args, username) {
        setTimeout(async () => {
            await bot.equip(87, 'hand')
        }, 1000);
        
        for (var z = -1; z <= 1; z++) {
            const target = bot.blockAt(bot.entity.position.offset(2, -1, z))
            if (target.name == `air`) {
                try {
                    console.log(target)
                    await bot.placeBlock(target, new Vec3(1, 0, 0))
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
