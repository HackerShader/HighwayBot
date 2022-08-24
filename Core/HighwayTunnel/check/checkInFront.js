module.exports = (bot) => {
    let checkInFront = Boolean(true);
    for (let y = 3; y >= 0; y--) {
        let wide = y == 0 ? 1 : 2
        for (let z = -wide; z <= wide; z++) {
            const target = bot.blockAt(bot.entity.position.offset(1, y, z));
            if (target.name === `air`) continue;
            checkInFront = false;
        }
    }
    return checkInFront;
};