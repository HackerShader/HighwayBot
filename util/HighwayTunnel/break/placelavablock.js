const Vec3 = require('vec3').Vec3;

module.exports = async (bot) => {
    bot.equip(87, 'hand')
    for (let x = 1; x <= 4; x++) {
        for (let y = -1; y <= 4; y++) {
            for (let z = -3; z <= 3; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                if (target.name !== `lava`) continue;
                try {
                    const lavablock = bot.blockAt(target.position.offset(-1, 0, 0));
                    await bot.lookAt(new Vec3(target.position.x - 1, target.position.y, target.position.z + 0.5 ))
                    await bot.placeBlock(lavablock, new Vec3(1, 0, 0));
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
