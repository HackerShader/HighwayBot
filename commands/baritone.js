const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const Vec3 = require('vec3').Vec3;
module.exports = {
    name: 'baritone',
    execute(bot, args, username) {
        const mcData = require('minecraft-data')(bot.version);
        const defaultMove = new Movements(bot, mcData);
        const target = bot.players[username] ? bot.players[username].entity : null;
        if (args[1] === `goto`) {
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalNear(args[1], args[2], args[3], 1))
            bot.chat(`/msg HackerShader Goto Coord: ${args[1]}, ${args[2]}, ${args[3]}`)
            return;
        } /*else {
            if (!target) return bot.chat('I don\'t see you !')
            const p = target.position
            bot.chat(`/msg ${username} I see you, Coord: ${(p.x).toFixed(0)}, ${(p.y).toFixed(0)}, ${(p.z).toFixed(0)}`)
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
            const positionrolate = new Vec3(p.x, p.y, p.z)
            bot.lookAt(positionrolate);
        }*/
    }
}