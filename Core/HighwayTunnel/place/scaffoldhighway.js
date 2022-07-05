const Vec3 = require('vec3').Vec3
const log = require('../../Console/log');
module.exports = async (bot) => {
    for (let y = -1; y <= 0; y++) {
        for (let z = -2; z <= 2; z++) {
            if ((z === 1 || z === -1 || z === 0) && y === 0) continue;
            const target = bot.blockAt(bot.entity.position.offset(2, y, z)),
                pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`, 
                pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`;
            if (target.name !== `air`) continue;
            const airlock = bot.blockAt(target.position.offset(-1, 0, 0));
            log(target.name, pos2, 'place', true)
            try {
                await bot.placeBlock(airlock, new Vec3(1, 0, 0));
                log(target.name, pos2, 'done', true)
            } catch (error) {}
        }
    }
};
