const Vec3 = require('vec3').Vec3;
const log = require('../../Console/log');
const file = require('../../data/status.json');

module.exports = async (bot) => {
    for (let y = -1; y <= 0; y++) {
        for (let z = -2; z <= 2; z++) {
            if ((z === 1 || z === -1 || z === 0) && y === 0) continue;
            const target = bot.blockAt(bot.entity.position.offset(2, y, z)),
                pos = `${target.position.x} ${target.position.y} ${target.position.z}`;
            if (target.name !== `air`) continue;
            const airlock = bot.blockAt(target.position.offset(-1, 0, 0));
            log(target.name, pos, 'place', true);
            try {
                await bot.placeBlock(airlock, new Vec3(1, 0, 0));
                file.place++;
                log(target.name, pos, 'done', true, '100');
            } catch (error) {
            }
        }
    }
};
