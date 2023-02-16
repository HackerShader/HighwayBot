module.exports = async (bot) => {

    //create arrays
    const block = {
        placeblock: [],
        breakblock: []
    }
    //loop to check area
    for (let x = -3; x <= 3; x++) {
        for (let y = -1; y <= 4; y++) {
            for (let z = -4; z <= 4; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                //requirement
                if (target.name === 'bedrock' || !target) continue;
                if (target.name === 'lava' || target.name === 'air' && ((y === 0 && (z === -2 || z === 2)) || (y === -1 && (z >= -2 && z <= 2)))) block.placeblock.push(target)
                if (target.name !== 'air'
                    && bot.canDigBlock(target)
                    && ((y === 0 && (z > -2 && z < 2))
                        || ((y > 0 && y <= 3) && (z >= -2 && z <= 2)))
                ) block.breakblock.push((target))
            }
        }
    }
    return block

}
