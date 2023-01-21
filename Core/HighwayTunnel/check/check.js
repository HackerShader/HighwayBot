module.exports = (bot) => {
    let checkwall = Boolean(true);
    for (let y = 3; y >= 0; y--) {
        let wide = y == 0 ? 1 : 2
            for (let z = -wide; z <= wide; z++) {
                const target = bot.blockAt(bot.entity.position.offset(2, y, z));
                if (target.name !== `air`) {
                    checkwall = false;
                }
            }

    }
    return checkwall;
};
