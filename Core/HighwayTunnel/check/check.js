module.exports = async (bot) => {
    //await require('./../break/minerewrite')(bot)
    async function check() {
        for (let x = 0; x <= 2; x++) {
            for (let y = 0; y <= 3; y++) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if ((z === -2 || z === 2) && y === 0 && target) continue;
                    if (target.name !== 'air') await require('./../break/minerewrite')(bot)
                    bot.navigate.to(bot.entity.position.offset(2, 0, 0));
                }
            }
        }
    }
    await check()
}