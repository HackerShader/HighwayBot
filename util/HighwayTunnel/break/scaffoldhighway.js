const Vec3 = require('vec3').Vec3;

module.exports = async (bot) => {
    bot.equip(87, 'hand');
    for (var z = -1; z <= 1; z++) {
        const target = bot.blockAt(bot.entity.position.offset(2, -1, z));
        if (target.name != `air`) continue;
        try {
            const airblock = bot.blockAt(target.position.offset(-1, 0, 0));
            await bot.placeBlock(airblock, new Vec3(1, 0, 0));
        } catch (error) {
            console.log(error);
        }
    }
}
