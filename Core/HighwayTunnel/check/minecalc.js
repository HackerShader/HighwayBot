module.exports = async (bot) => {
    let block = 0;
    for (let x = -3; x <= 2; x++) {
        for (let y = 3; y >= 0; y--) {
            for (let z = -2; z <= 2; z++) {
                const BlockCount = bot.blockAt(bot.entity.position.offset(x, y, z));
                if (BlockCount.name === 'air' || !bot.canDigBlock(BlockCount) || !BlockCount) continue;
                if ((z === -2 || z === 2) && y === 0 && BlockCount) continue;
                block++;
            }
        }
    }
    return block;
};