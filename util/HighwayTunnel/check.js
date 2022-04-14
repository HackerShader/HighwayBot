module.exports = async (bot) => {
    let checkwall = Boolean
    for (var y = 3; y >= 0; y--) {
        if (y != 0) {
            for (var z = -2; z <= 2; z++) {
                const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                if (target.name != `air`) {
                    checkwall = false
                }
            }
        } else if (y == 0) {
            for (var z = -1; z <= 1; z++) {
                const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                if (target.name != `air`) {
                    checkwall = false
                }
            }
        }
    }
    return checkwall;
}