module.exports = (bot) => {
    let checkInFront = Boolean(true);
    for (let y = 3; y >= 0; y--) {
        if (y !== 0) {
            for (let z = -2; z <= 2; z++) {
                const target = bot.blockAt(bot.entity.position.offset(1, y, z));
                if (target.name === `air`) continue;
                checkInFront = false;
            }
            continue;
        }
        if (y === 0) {
            for (let z = -1; z <= 1; z++) {
                const target = bot.blockAt(bot.entity.position.offset(1, y, z));
                if (target.name === `air`) continue;
                checkInFront = false;
            }
        }
    }
    return checkInFront;
};