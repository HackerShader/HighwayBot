const Vec3 = require('vec3').Vec3;
const log = require('../../Console/log');

module.exports = async (bot) => {
    for (let x = 1; x <= 4; x++) {
        for (let y = -1; y <= 4; y++) {
            for (let z = -3; z <= 3; z++) {
                const block = bot.blockAt(bot.entity.position.offset(x, y, z)),
                    pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`,
                    pos2 = `${block.position.x} ${block.position.y} ${block.position.z}`;
                if (block.name !== `lava`) continue;
                try {
                    const lavablock = bot.blockAt(block.position.offset(-1, 0, 0));
                    bot.lookAt(new Vec3(block.position.x - 1, block.position.y, block.position.z + 0.5));
                    log(block.name, pos2, 'place', true);
                    await bot.placeBlock(lavablock, new Vec3(1, 0, 0));
                    log(block.name, pos2, 'done', true);
                } catch (error) {
                }
            }
        }
    }
};
