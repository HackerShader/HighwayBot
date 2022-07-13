const Vec3 = require('vec3').Vec3;
const log = require('../../Console/log');
const data = require('../../console/status.json');

module.exports = async (bot) => {
    for (let x = 1; x <= 4; x++) {
        for (let y = -1; y <= 4; y++) {
            for (let z = -3; z <= 3; z++) {
                const block = bot.blockAt(bot.entity.position.offset(x, y, z)),
                    pos = `${block.position.x} ${block.position.y} ${block.position.z}`;
                if (block.name !== `lava`) continue;
                try {
                    const lavablock = bot.blockAt(block.position.offset(-1, 0, 0));
                    bot.lookAt(new Vec3(block.position.x - 1, block.position.y, block.position.z + 0.5));
                    log(block.name, pos, 'place', true);
                    await bot.placeBlock(lavablock, new Vec3(1, 0, 0));
                    data.place++;
                    log(block.name, pos, 'done', true);
                } catch (error) {
                }
            }
        }
    }
};
