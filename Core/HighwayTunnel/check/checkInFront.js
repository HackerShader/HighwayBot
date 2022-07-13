module.exports = (bot) => {
    let checkInFront = Boolean(true);
    for (let y = 3; y >= 0; y--) {
        for (let z = -2; z <= 2; z++) {
            if ((z === -2 || z === 2) && y === 0) continue;
            const target = bot.blockAt(bot.entity.position.offset(1, y, z));
            if (target.name === `air`) continue;
            checkInFront = false;
        }
    }
    return checkInFront;
};