module.exports = (bot) => {
    const scaffold = {
        check: false,
    };
    for (let y = -1; y <= 0; y++) {
        for (let z = -2; z <= 2; z++) {
            if ((z === 1 || z === -1 || z === 0) && y === 0) continue;
            const target = bot.blockAt(bot.entity.position.offset(2, y, z));
            if (target.name !== `air`) continue;
            scaffold.check = true;
        }
    }
    return scaffold.check;
};