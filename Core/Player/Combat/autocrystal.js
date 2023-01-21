const Vec3 = require('vec3').Vec3;
const config = require(`./../../../config/${require('./../../../settings.json').config}`);

module.exports = async (bot) => {
    if (config.module.player.combat.autocrystal.toggle === false) return;
    let invslots = 0;
    let item = 'end_crystal';
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== item) continue;
        invslots = i;
    }
    let hasItem = bot.inventory.slots[invslots];
    if (hasItem) bot.equip(hasItem, 'hand');

    setInterval(async () => {
            bot.nearestEntity(async (entity) => {
                for (let x = -1; x <= 1; x++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x === 0 || z === 0 || (x === 1 && z === 1) || (x === -1 && z === -1)) continue;
                        const blockPos = entity.position.floored().offset(x, -1, z)
                        try {
                            await bot.attack(entity, true)
                            if (entity.name !== 'ender_crystal') {
                                try {
                                    await bot.placeBlock(bot.blockAt(blockPos), new Vec3(0, 1, 0))
                                } catch {
                                }
                            }
                        } catch {
                        }
                    }
                }
            })
    }, 20);



};
