const { Bot } = require('mineflayer')
const { GoalNear } = require('mineflayer-pathfinder').goals

/**
 * 
 * @param {Bot} bot 
 */
module.exports = async (bot) => {
    async function check() {
        let block = false
        for (let x = 0; x <= 2; x++) {
            for (let y = 0; y <= 3; y++) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if ((z === -2 || z === 2) && y === 0 && target) continue;
                    console.log(`Checking at ${target.position.x} ${target.position.y} ${target.position.z} | ${target.name}`)
                    if (target.name !== 'air') block = true
                }
            }
        }
        return block
    }

    //await bot.navigate.to(bot.entity.position.offset(2, 0, 0));
    let cb = await check()
    console.log(cb)
    if (cb === false) {
        let p = bot.entity.position.offset(1, 0, 0)
        bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
        require('../break/minerewrite')(bot)
    } else require('../break/minerewrite')(bot)
}