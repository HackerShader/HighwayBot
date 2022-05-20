module.exports = async (bot) => {
    for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 3; y++) {
            for (let z = -2; z == 2; z++) {
                const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                if ((z === -2 || z === 2) && y === 0 && target) continue;
                //if (target.name !== 'air') require('./../break/minerewrite')(bot)
                console.log(target.name)
                bot.navigate.to(bot.entity.position.offset(1, 0, 0));
            }
        }
    }
}